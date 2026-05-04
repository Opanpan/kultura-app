"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function CollabForm({ locale }: { locale: string }) {
  const isId = locale === "id";

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const label = {
    title: "Let's Collab!",
    subtitle: isId
      ? "Punya lahan yang sulit terjual? Saatnya mengubahnya menjadi peluang bersama Kultura Properties. Tinggalkan data dan kami akan menghubungi Anda."
      : "Got land that's hard to sell? Let's turn it into an opportunity together. Leave your details and we'll reach out.",
    name: isId ? "Nama" : "Name",
    phone: isId ? "Nomor Telepon" : "Phone Number",
    message: isId ? "Isi Pesan" : "Message",
    placeholder_name: isId ? "Nama lengkap Anda" : "Your full name",
    placeholder_phone: isId ? "08xx xxxx xxxx" : "+62 8xx xxxx xxxx",
    placeholder_message: isId
      ? "Ceritakan tentang lahan Anda — lokasi, luas, kondisi, dan harapan Anda..."
      : "Tell us about your land — location, size, condition, and what you're hoping for...",
    submit: isId ? "Kirim Pesan" : "Send Message",
    sending: isId ? "Mengirim..." : "Sending...",
    success_title: isId ? "Pesan Terkirim!" : "Message Sent!",
    success_body: isId
      ? "Terima kasih. Tim kami akan menghubungi Anda segera."
      : "Thank you. Our team will get in touch with you shortly.",
    error_body: isId
      ? "Gagal mengirim pesan. Silakan coba lagi."
      : "Failed to send message. Please try again.",
    retry: isId ? "Coba lagi" : "Try again",
    send_another: isId ? "Kirim lagi" : "Send another",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/collab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-40 bg-white/8 border border-white/12 text-white focus:border-white/40 focus:bg-white/12";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>
        <p className="text-xl font-bold text-white">{label.success_title}</p>
        <p className="text-sm opacity-50 text-white max-w-xs">{label.success_body}</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", message: "" }); }}
          className="mt-2 text-xs underline opacity-40 hover:opacity-70 transition-opacity text-white"
        >
          {label.send_another}
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-30 mb-5 text-white">Collaboration</p>
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{label.title}</h3>
      <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>{label.subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {label.name}
          </label>
          <input
            type="text"
            required
            disabled={loading}
            placeholder={label.placeholder_name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {label.phone}
          </label>
          <input
            type="tel"
            required
            disabled={loading}
            placeholder={label.placeholder_phone}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputBase}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {label.message}
          </label>
          <textarea
            required
            rows={5}
            disabled={loading}
            placeholder={label.placeholder_message}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-300">{label.error_body}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "var(--bg)", color: "var(--fg)" }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {label.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {label.submit}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
