"use client";
import api from "@/services/api";
import * as faceapi from "face-api.js";
import { CameraIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangeAvatarForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState<boolean | null>(null);

  // 1️⃣ Carregar modelos do face-api.js
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  const handleChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // 🔥 gera URL temporária para preview
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);

    // 2️⃣ Verificar rosto na imagem
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(img);
      if (detections.length > 0) {
        setFaceDetected(true);
        console.log("✅ Rosto detectado!");
      } else {
        setFaceDetected(false);
        console.warn("❌ Nenhum rosto detectado!");
      }
    };
  };

  const handleSendChange = async () => {
    if (!file || !faceDetected) {
      alert("Envie uma imagem com um rosto válido!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await api.post("/update/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Avatar atualizado:", response.data);

      router.replace("/home");
    } catch (err) {
      console.error("❌ Erro ao enviar avatar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-50 h-50 overflow-hidden rounded-full bg-slate-200 mb-8">
        <img
          src={preview ?? "/default.png"}
          alt="Avatar"
          className="w-49 h-49 object-cover rounded-full"
        />
      </div>

      {faceDetected === false && (
        <p className="text-red-500 text-sm mb-4">
          Nenhum rosto detectado na imagem! 🚫
        </p>
      )}

      {preview ? (
        <div className="flex gap-4">
          <button
            type="button"
            disabled={loading || !faceDetected}
            onClick={handleSendChange}
            className="flex items-center justify-center gap-4 bg-blue-800 text-white border-0 px-4 py-2 rounded-sm disabled:opacity-50"
          >
            <CameraIcon color="#fff" />
            <span>
              {loading
                ? "Enviando..."
                : faceDetected
                ? "Enviar"
                : "Rosto não detectado"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleChange}
            className="flex items-center justify-center gap-4 bg-slate-800 text-white border-0 px-4 py-2 rounded-sm"
          >
            <CameraIcon color="#fff" />
            <span>Mudar</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleChange}
          className="flex items-center justify-center gap-4 bg-blue-800 text-white border-0 px-4 py-2 rounded-sm"
        >
          <CameraIcon color="#fff" />
          <span>Alterar foto</span>
        </button>
      )}

      <input
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        type="file"
        name="file"
        id="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
      />
    </div>
  );
}
