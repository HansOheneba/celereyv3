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

interface ConsultationBookingEmailProps {
  name: string;
  bookingLink: string;
}

export function ConsultationBookingEmail({
  name,
  bookingLink,
}: ConsultationBookingEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>Your booking link is ready, {firstName} &mdash; Celerey</Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://i.ibb.co/PGVKSsV1/image.png"
              alt="Celerey"
              height={100}
              style={{ margin: "0 auto", display: "block" }}
            />
          </Section>

          {/* Card */}
          <Section style={card}>
            <Text style={eyebrow}>FREE CONSULTATION</Text>
            <Text style={headline}>
              Your booking link is ready, {firstName}.
            </Text>

            <Text style={bodyText}>
              Thank you for signing up. Your 15-minute session with one of our
              advisors is completely free.
            </Text>

            <Text style={bodyText}>
              Use this time to get clarity on where you are financially, explore
              what&apos;s possible, and leave with clear next steps. No
              preparation needed on your end.
            </Text>

            <Section style={buttonRow}>
              <Link href={bookingLink} style={ctaButton}>
                Choose a time &rarr;
              </Link>
            </Section>

            <Section style={reminderBox}>
              <Text style={reminderText}>
                A good conversation is often all it takes to get started.
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={bodyText}>
              The link above stays valid, so take your time. If you have any
              questions before your session, we&apos;re here.
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
              You&apos;re receiving this because you requested a free
              consultation at{" "}
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

ConsultationBookingEmail.PreviewProps = {
  name: "Alex Johnson",
  bookingLink: "https://calendly.com/celerey/free-consultation",
} satisfies ConsultationBookingEmailProps;

export default ConsultationBookingEmail;

// ── Styles ───────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#f4f2ee",
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px 16px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "24px",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "36px 40px",
  marginTop: "10px",
};

const eyebrow: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: "#b07d3d",
  fontWeight: "600",
  textTransform: "uppercase",
  margin: "0 0 14px",
};

const headline: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "400",
  color: "#160b35",
  lineHeight: "1.3",
  fontFamily: "Georgia, Times New Roman, serif",
  margin: "0 0 18px",
};

const bodyText: React.CSSProperties = {
  fontSize: "14.5px",
  color: "#5a6478",
  lineHeight: "1.85",
  margin: "0 0 18px",
};

const buttonRow: React.CSSProperties = {
  margin: "24px 0",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#160b35",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  borderRadius: "8px",
  padding: "14px 28px",
};

const reminderBox: React.CSSProperties = {
  backgroundColor: "#fdf8f0",
  borderLeft: "3px solid #b07d3d",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "8px 0 24px",
};

const reminderText: React.CSSProperties = {
  fontSize: "13.5px",
  color: "#7a5c2e",
  lineHeight: "1.7",
  fontStyle: "italic",
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "#e8e4dc",
  margin: "24px 0",
};

const signOff: React.CSSProperties = {
  fontSize: "14px",
  color: "#160b35",
  lineHeight: "1.8",
  margin: "0",
};

const footer: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "1.7",
  margin: "0",
};

const footerLink: React.CSSProperties = {
  color: "#9ca3af",
  textDecoration: "underline",
};
