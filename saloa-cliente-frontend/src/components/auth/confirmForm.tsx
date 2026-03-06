"use client";
import api from "@/api/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const ConfirmForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const isComplete = otp.every((digit) => digit !== "");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      setMessage("");
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = inputsRef.current[index + 1];
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = inputsRef.current[index - 1];
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/verify/email", { token: code });
      const data = response.data;
      if (response.status === 200) {
        setMessage(data.message || "✅ Código verificado com sucesso!");
        router.replace("/personalizar/avatar");
      } else {
        setLoading(false);
        setMessage(data.error || "❌ Código inválido, tente novamente.");
      }
    } catch (err: any) {
      setMessage(
        err?.response?.data?.error ||
          "❌ Erro ao verificar código. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const firstInput = inputsRef.current[0];
    firstInput?.focus();
  }, []);

  useEffect(() => {
    if (isComplete && !loading) {
      handleVerify();
    }
  }, [isComplete]);

  useEffect(() => {
    const savedExpire = localStorage.getItem("otpExpireTime");

    if (savedExpire) {
      const remaining = Math.floor((Number(savedExpire) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpireTime");
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleReesendCode = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/verify/email/reenviar");
      const data = response.data;

      setMessage(data.message || "✅ Código reenviado com sucesso!");

      // 🔥 Inicia contador de 2 minutos (120 segundos)
      const expireTime = Date.now() + 2 * 60 * 1000;
      localStorage.setItem("otpExpireTime", expireTime.toString());
      setTimeLeft(120);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.error || "❌ Não foi possível reenviar o código.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (paste) {
      const newOtp = paste.split("");
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

      setTimeout(() => {
        inputsRef.current[Math.min(paste.length, 5)]?.focus();
      }, 0);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 2 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="off"
            autoSave="off"
            autoCorrect="off"
            onPaste={handlePaste}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-12 text-center text-xl tracking-widest font-semibold rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        ))}
      </div>
      {message && <p className="text-center mt-4 font-medium">{message}</p>}
      <button
        onClick={handleVerify}
        disabled={!isComplete || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors pt-2 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verificando..." : "Verificar"}
      </button>
      <div className="w-full flex items-center justify-start  gap-1.5 pt-1.5 ">
        <p className="text-gray-500">Não recebeu o codigo?</p>
        <button
          onClick={handleReesendCode}
          disabled={timeLeft > 0}
          className="cursor-pointer bg-transparent border-none disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {timeLeft > 0 ? `Reenviar em ${formatTime(timeLeft)}` : "Reenviar"}
        </button>
      </div>
    </div>
  );
};
