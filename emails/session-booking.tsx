import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SessionBookingEmailProps {
  name: string;
  paymentUrl: string;
}

export function SessionBookingEmail({
  name,
  paymentUrl,
}: SessionBookingEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>Complete your booking, {firstName} &mdash; Celerey</Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://i.ibb.co/d0v22fZp/logo-Dark.png"
              alt="Celerey"
              height={100}
              style={{ margin: "0 auto", display: "block" }}
            />
          </Section>

          {/* Card */}
          <Section style={card}>
            <Text style={eyebrow}>45-MINUTE SESSION</Text>
            <Text style={headline}>Almost there, {firstName}.</Text>

            <Text style={bodyText}>
              Thank you for filling in your details. Your 45-minute private
              advisory session is one step away.
            </Text>

            <Text style={bodyText}>
              Complete your payment below to confirm your booking. Once paid,
              you will receive a private scheduling link to choose a time that
              works for you.
            </Text>

            <Section style={buttonRow}>
              <Link href={paymentUrl} style={ctaButton}>
                Complete payment &rarr;
              </Link>
            </Section>

            <Section style={reminderBox}>
              <Text style={reminderText}>
                $99 &middot; One-time &middot; No subscription required
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={bodyText}>
              If the button above does not work, copy and paste this link into
              your browser:
            </Text>
            <Text style={linkText}>
              <Link href={paymentUrl} style={inlineLink}>
                {paymentUrl}
              </Link>
            </Text>

            <Text style={signOff}>
              Warm regards,
              <br />
              The Celerey Advisory Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you requested a session at{" "}
              <Link href="https://celerey.co" style={footerLink}>
                celerey.co
              </Link>
              .&nbsp;&middot;&nbsp;
              <Link href="mailto:info@celerey.co" style={footerLink}>
                info@celerey.co
              </Link>
              <br />
              &copy; {new Date().getFullYear()} Celerey. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

SessionBookingEmail.PreviewProps = {
  name: "Alex Johnson",
  paymentUrl: "https://buy.stripe.com/test_fZu9AT3b42k9fcT2s99Ve01",
} satisfies SessionBookingEmailProps;

export default SessionBookingEmail;

// ── Styles ───────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#f4f2ee",
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 16px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "40px 40px 32px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
};

const eyebrow: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#b07d3d",
  margin: "0 0 12px",
};

const headline: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#160b35",
  margin: "0 0 20px",
  lineHeight: "1.3",
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const buttonRow: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0 20px",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#160b35",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 32px",
  display: "inline-block",
};

const reminderBox: React.CSSProperties = {
  backgroundColor: "#fdf0e0",
  borderRadius: "12px",
  padding: "12px 20px",
  textAlign: "center",
  margin: "0 0 24px",
};

const reminderText: React.CSSProperties = {
  fontSize: "13px",
  color: "#b07d3d",
  fontWeight: "600",
  margin: 0,
};

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const linkText: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0 0 24px",
  wordBreak: "break-all",
};

const inlineLink: React.CSSProperties = {
  color: "#160b35",
};

const signOff: React.CSSProperties = {
  fontSize: "15px",
  color: "#374151",
  lineHeight: "1.7",
  margin: "24px 0 0",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  marginTop: "24px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "1.6",
  margin: 0,
};

const footerLink: React.CSSProperties = {
  color: "#9ca3af",
  textDecoration: "underline",
};
