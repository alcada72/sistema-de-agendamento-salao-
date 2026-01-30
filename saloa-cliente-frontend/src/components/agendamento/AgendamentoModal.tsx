"use client";
import { PostAgendamento } from "@/services/servico.service";
import { useState, useTransition } from "react";
import { ActiveProgressIndicator } from "../ui/spin";
import { Calendar } from "./Calendar";
import { ConfirmStep } from "./ConfirmStep";
import { ProfissionaList } from "./profionalList";
import { TimeSlotPicker } from "./TimeSlotPicker";

export function AgendamentoModal({
  onClose,
  serviceId,
}: {
  onClose: () => void;
  serviceId: string;
}) {
  const [step, setStep] = useState(1);
  const [isPadinng, startTransition] = useTransition();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [profissional, setprofissional] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!date || !time || !profissional) return;

    const [hours, minutes] = time.split(":").map(Number);

    const dataCompleta = new Date(
      date.getFullYear(),
      date.getMonth(), // mês é 0-based
      date.getDate(),
      hours,
      minutes,
      0
    );

    const formatedDate = new Date(
      `${dataCompleta.toISOString().split("T")[0]}T${time}:00.000Z`
    ).toISOString();

    try {
      startTransition(async () => {
        await PostAgendamento({
          serviceId,
          professionalId: profissional,
          date: new Date(formatedDate).toISOString(),
        });

        onClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isPadinng) {
    return (
      <div
        className="fixed inset-0 flex  bg-neutral-400/40 
          backdrop-blur-[5px] items-center justify-center z-50 size-full"
      >
        <ActiveProgressIndicator />
      </div>
    );
  }
  return (
    <div
      className="fixed inset-0 flex  bg-neutral-400/40 
          backdrop-blur-[5px] items-center justify-center z-50 size-full"
    >
      <div
        className="rounded-2xl bg w-[95%] max-w-md p-6 border
           border-neutral-200/30 backdrop-brightness-200 items-center justify-center"
      >
        {step === 1 && (
          <Calendar
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setStep(2);
            }}
          />
        )}

        {step === 2 && date && (
          <TimeSlotPicker
            date={date}
            onSelect={(t) => {
              setTime(t);
              setStep(3);
            }}
          />
        )}
        {step === 3 && date && (
          <ProfissionaList
            date={date}
            onSelect={(p) => {
              setprofissional(p);
              setStep(4);
            }}
          />
        )}

        {step === 4 && date && time && (
          <ConfirmStep date={date} time={time} onConfirm={handleConfirm} />
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-800 text-center w-full"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
