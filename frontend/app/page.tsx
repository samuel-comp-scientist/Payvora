"use client";

import { useState } from "react";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#10b981" />
    <path d="M4 7.5L6.5 10L11 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const painPoints = [
  { icon: "💸", headline: "You lose money waiting", body: "Every unpaid invoice is cash you earned but don't have. That late payment? It's your rent, your groceries, your time stolen." },
  { icon: "😤", headline: "You waste hours chasing", body: "Writing follow-up emails. Checking bank accounts. Feeling awkward. Hours you could spend billing actual work." },
  { icon: "😰", headline: "You stress about money", body: "That pit in your stomach when you check who's paid. The dread of sending another 'just checking in' email." },
];

const features = [
  { icon: "⚡", title: "Send invoice in under 30 seconds", body: "Add client, items, due date. Payvora handles the math, formatting, and delivery instantly." },
  { icon: "📧", title: "Clients get professional emails", body: "Branded invoices delivered straight to their inbox. No attachments lost, no spam folder." },
  { icon: "⏰", title: "Automatic reminders that work", body: "Payvora follows up 4 times automatically — before due date, on the day, and twice after. You do nothing." },
  { icon: "📊", title: "See who's paid and who hasn't", body: "Real-time dashboard. Green = paid. Yellow = waiting. Red = needs attention. No guessing." },
  { icon: "📥", title: "Download PDFs in one click", body: "Professional PDF invoices for accounting, taxes, or clients who want paper. Instant." },
  { icon: "🎨", title: "Look professional automatically", body: "Your logo, your colors, your business name. Every invoice looks like you hired a designer." },
];

const proFeatures = [
  "Unlimited invoices",
  "Automatic payment reminders",
  "Email invoice delivery",
  "PDF invoice export",
  "Client management system",
];

const faqs = [
  { q: "Do I still need to chase clients?", a: "No. Payvora sends 4 automatic reminders — before due date, on the day, and twice after. You never write a follow-up email again." },
  { q: "Does it actually work?", a: "Yes. Set a due date and Payvora handles the rest. Emails sent from your account, tracked automatically, zero input from you." },
  { q: "What's the Lifetime plan?", a: "Pay once, keep forever. No monthly bills. For freelancers who hate subscriptions. Limited to 50 people." },
  { q: "Can I use my own logo?", a: "Yes. Upload once. Appears on every invoice, email, and PDF automatically." },
];

export default function PayvoraLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<"monthly" | "lifetime">("monthly");

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(11,15,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, zIndex: 50, padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#34d399,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>P</div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>Payvora</span>
        </div>
        <div style={{ display: "flex", gap: "24px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          {["Features", "Pricing", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.5)", transition: "color .2s" }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", padding: "6px 12px" }}>Log in</a>
          <a href="#pricing" style={{ fontSize: 13, background: "#10b981", color: "white", padding: "7px 16px", borderRadius: 8, fontWeight: 600 }}>Get instant access</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "88px 2rem 56px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 280, background: "rgba(16,185,129,0.1)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(38px,6.5vw,70px)", fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.04, marginBottom: 24 }}>
            You lose money every time<br />
            <span style={{ background: "linear-gradient(90deg,#34d399,#2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              you avoid a follow-up.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Payvora automatically sends invoices and chases payments — so you don't have to.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#10b981", color: "white", padding: "15px 30px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
              Get paid this week
              <ArrowRight />
            </a>
            <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", padding: "15px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", fontSize: 16 }}>
              See how it works
            </a>
          </div>
        </div>

        {/* Dashboard mockup — simplified */}
        <div style={{ maxWidth: 780, margin: "52px auto 0", background: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "11px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["rgba(239,68,68,0.6)", "rgba(234,179,8,0.6)", "rgba(34,197,94,0.6)"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>payvora.app/dashboard</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Updated 2h ago</span>
              <span style={{ fontSize: 11, color: "#34d399", background: "rgba(52,211,153,0.1)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>Pro</span>
            </div>
          </div>
          {/* 3 stats only */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Total Paid", value: "$37,842", color: "#34d399" },
              { label: "Pending", value: "$5,650", color: "#facc15" },
              { label: "Overdue", value: "$2,100", color: "#f87171" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "18px 22px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "16px 20px" }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <th style={{ textAlign: "left", paddingBottom: 10, fontWeight: 500 }}>Client</th>
                  <th style={{ textAlign: "left", paddingBottom: 10, fontWeight: 500 }}>Amount</th>
                  <th style={{ textAlign: "left", paddingBottom: 10, fontWeight: 500 }}>Due</th>
                  <th style={{ textAlign: "left", paddingBottom: 10, fontWeight: 500 }}>Status</th>
                  <th style={{ textAlign: "left", paddingBottom: 10, fontWeight: 500 }}>Reminder</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { client: "Acme Corp", amount: "$2,350", due: "May 15", status: "Paid", sc: "rgba(52,211,153,0.12)", tc: "#34d399", reminder: "—" },
                  { client: "Nova Studio", amount: "$1,150", due: "May 20", status: "Pending", sc: "rgba(250,204,21,0.12)", tc: "#facc15", reminder: "Sent today" },
                  { client: "Bright Media", amount: "$3,600", due: "Apr 30", status: "Overdue", sc: "rgba(248,113,113,0.12)", tc: "#f87171", reminder: "Follow-up #2 sent" },
                  { client: "TechFlow Inc", amount: "$850", due: "Apr 28", status: "Failed", sc: "rgba(239,68,68,0.12)", tc: "#ef4444", reminder: "Retry scheduled" },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "11px 0", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{row.client}</td>
                    <td style={{ color: "rgba(255,255,255,0.7)" }}>{row.amount}</td>
                    <td style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{row.due}</td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 600, background: row.sc, color: row.tc, padding: "3px 10px", borderRadius: 999 }}>{row.status}</span>
                    </td>
                    <td style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{row.reminder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section style={{ padding: "20px 2rem 72px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#fca5a5" }}>{p.headline}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
            Payvora eliminates all three — automatically, for <strong style={{ color: "#34d399" }}>$29/month.</strong>
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "60px 2rem 72px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#34d399", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 12 }}>Built for people who hate chasing money</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, maxWidth: 460, margin: "0 auto" }}>Six things that replace your entire invoicing workflow.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ fontSize: 24, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REMINDER HIGHLIGHT */}
      <section style={{ padding: "0 2rem 72px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", background: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 280, height: 280, background: "rgba(16,185,129,0.08)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", position: "relative" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#34d399", display: "block", marginBottom: 12 }}>The feature that pays for itself</span>
              <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-1px" }}>
                Your invoices follow up — even when you don't.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 24, fontSize: 14 }}>
                Set a due date. Payvora does the rest — reminder before, reminder on the day, follow-up after. Multiple times. Zero effort from you.
              </p>
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 24 }}>
                "If this saves you just <strong style={{ color: "#34d399" }}>1 late payment per month</strong>, it already pays for itself."
              </div>
              <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#10b981", color: "white", padding: "12px 22px", borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
                Stop chasing payments <ArrowRight />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📅", label: "3 days before due", tag: "Friendly reminder", tc: "#34d399", bg: "rgba(52,211,153,0.1)" },
                { icon: "📬", label: "On the due date", tag: "Invoice due today", tc: "#facc15", bg: "rgba(250,204,21,0.1)" },
                { icon: "⚠️", label: "3 days overdue", tag: "Payment overdue", tc: "#f87171", bg: "rgba(248,113,113,0.1)" },
                { icon: "🔔", label: "7 days overdue", tag: "Final notice", tc: "#fca5a5", bg: "rgba(239,68,68,0.1)" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  <span style={{ fontSize: 11, background: item.bg, color: item.tc, padding: "3px 10px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap" }}>{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "60px 2rem 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#34d399", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>Simple, honest pricing</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginBottom: 32 }}>One plan. Everything included. No surprises.</p>

          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 4, marginBottom: 40 }}>
            {(["monthly", "lifetime"] as const).map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{ padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: billing === b ? "#10b981" : "transparent", color: billing === b ? "white" : "rgba(255,255,255,0.4)", transition: "all .2s" }}>
                {b === "monthly" ? "Monthly" : "Lifetime ✦"}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 400, margin: "0 auto", background: "linear-gradient(170deg,#111827,#0d1a12)", border: "2px solid rgba(16,185,129,0.4)", borderRadius: 24, padding: "40px 32px", position: "relative" }}>
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
              <span style={{ background: "#10b981", color: "white", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }}>Most Popular</span>
            </div>
            {billing === "lifetime" && (
              <div style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "#fb923c", marginBottom: 16, fontWeight: 600 }}>
                ⚡ Only {42} spots left — 50 total
              </div>
            )}
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Payvora Pro</p>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-2px" }}>{billing === "monthly" ? "$29" : "$299"}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>{billing === "monthly" ? "/mo" : " once"}</span>
            </div>
            {billing === "lifetime"
              ? <p style={{ color: "#34d399", fontSize: 13, marginBottom: 28 }}>For freelancers who hate subscriptions. Pay once, never think about billing again.</p>
              : <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 28 }}>Instant access after payment. Start getting paid this week.</p>
            }
            <ul style={{ textAlign: "left", listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              {proFeatures.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  <Check /> {f}
                </li>
              ))}
            </ul>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#10b981", color: "white", padding: 16, borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
              {billing === "monthly" ? "Get instant access — $29/mo" : "Get Lifetime Access — $299"} <ArrowRight />
            </a>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 12 }}>
              {billing === "monthly" ? "Cancel anytime. 30-day money-back guarantee." : "One-time payment. Full access forever."}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "60px 2rem 80px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 10 }}>Got questions?</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>Short answers. No jargon.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "white" }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.85)", paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 20, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 16px" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "20px 2rem 80px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(13,148,136,0.05))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 28, padding: "60px 40px" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 12 }}>Stop waiting for payments.</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
            Fix your cash flow in 5 minutes. Start getting paid this week.
          </p>
          <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#10b981", color: "white", padding: "16px 32px", borderRadius: 14, fontWeight: 700, fontSize: 17 }}>
            Get instant access <ArrowRight />
          </a>
          <p style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>30-day money-back guarantee · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#34d399,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>P</div>
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Payvora</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© {new Date().getFullYear()} Payvora. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            {["Privacy", "Terms", "Contact"].map(l => <a key={l} href="#" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
