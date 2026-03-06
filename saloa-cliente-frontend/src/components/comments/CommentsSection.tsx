"use client";

import { postComment } from "@/services/comments.service";
import { Comment } from "@/types/comments";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { CommentCard } from "./CommentCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const CHAR_LIMIT = 280;

export default function CommentsSection({
  serviceId,
  commentsList,
}: {
  serviceId: string;
  commentsList: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(commentsList);
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = text.length;
  const isOverLimit = charCount > CHAR_LIMIT;
  const isEmpty = text.trim().length === 0;
  const progress = Math.min(charCount / CHAR_LIMIT, 1);
  const circumference = 2 * Math.PI * 10;
  const strokeDashoffset = circumference * (1 - progress);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = async (): Promise<void> => {
    if (isEmpty || isOverLimit || sending) return;
    try {
      setSending(true);

      const newComment = await postComment(serviceId, text);
      setText("");
      setSending(false);
      setSent(false);
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.log(error);
      setSending(false);
      setSent(false);
      return alert(
        "Ocorreu um erro ao enviar seu comentário. Tente novamente.",
      );
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const canSubmit = !isEmpty && !isOverLimit && !sending;

  return (
    <div className=" flex items-start justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold  tracking-tight">Comentários</h1>

          <p className="text-slate-500 text-sm">
            {comments.length}{" "}
            {comments.length === 1 ? "comentário" : "comentários"} neste
            serviço
          </p>
        </div>

        {/* Input Card */}
        <div
          className={`relative vbg backdrop-blur-md rounded-3xl shadow-lg border transition-all duration-300 mb-6 overflow-hidden ${
            focused
              ? "border-indigo-300 shadow-indigo-50/20 shadow-lg"
              : "border-white/90"
          }`}
        >
          {/* Focused glow line */}
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 transition-opacity duration-300 ${
              focused ? "opacity-100" : "opacity-30"
            }`}
          />

          <div className="flex gap-3 p-4 pb-0">
         
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva um comentário..."
                rows={1}
                className="w-full resize-none bg-transparent  placeholder-slate-400 text-sm leading-relaxed outline-none pt-2 min-h-[40px] max-h-[160px]"
                style={{ transition: "height 0.15s ease" }}
              />
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-4 py-3 mt-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-400 font-mono text-[10px]">
                ⌘
              </kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-400 font-mono text-[10px]">
                ↵
              </kbd>
              <span>para enviar</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Circular char counter */}
              {charCount > 0 && (
                <div className="relative w-6 h-6">
                  <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke={
                        isOverLimit
                          ? "#f43f5e"
                          : progress > 0.85
                            ? "#f97316"
                            : "#6366f1"
                      }
                      strokeWidth="2"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{
                        transition:
                          "stroke-dashoffset 0.15s ease, stroke 0.2s ease",
                      }}
                    />
                  </svg>
                  {isOverLimit && (
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-rose-500">
                      {charCount - CHAR_LIMIT}
                    </span>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  canSubmit
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:scale-105 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {sending ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Enviando
                  </>
                ) : sent ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Enviado!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Comentar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="flex flex-col gap-3">
          {comments.length === 0 ? (
            <p className="text-slate-500 text-sm italic">Nenhum comentário ainda.</p>
          ) : (
            comments.map((comment, i) => (
              <CommentCard key={comment.id} comment={comment} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
