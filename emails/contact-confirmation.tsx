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

interface ContactConfirmationEmailProps {
  name: string;
  subject?: string;
}

export function ContactConfirmationEmail({
  name,
  subject,
}: ContactConfirmationEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>We&apos;ve received your message &mdash; Celerey</Preview>

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
            <Text style={headline}>We&apos;ve received your message.</Text>

            <Text style={bodyText}>
              Hi {firstName}, thank you for reaching out to Celerey.
              {subject
                ? ` We received your enquiry regarding &ldquo;${subject}&rdquo;.`
                : ""}{" "}
              A member of our advisory or client experience team will be in
              touch with you within one business day.
            </Text>

            <Text style={bodyText}>
              In the meantime, feel free to explore our resources or reach us
              directly on WhatsApp if your matter is urgent.
            </Text>

            <Section style={buttonRow}>
              <Link href="https://wa.me/12272296921" style={ctaButton}>
                Message us on WhatsApp
              </Link>
            </Section>

            <Section style={buttonRow}>
              <Link href="https://celerey.co/resources" style={secondaryButton}>
                Explore Resources
              </Link>
            </Section>

            <Hr style={divider} />

            <Text style={signOff}>
              Warm regards,
              <br />
              The Celerey Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you submitted a contact form at{" "}
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

ContactConfirmationEmail.PreviewProps = {
  name: "Alex Johnson",
  subject: "Wealth Planning Inquiry",
} satisfies ContactConfirmationEmailProps;

export default ContactConfirmationEmail;

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

const headline: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "400",
  color: "#160b35",
  lineHeight: "1.3",
  fontFamily: "Georgia, Times New Roman, serif",
  margin: "0 0 16px",
};

const bodyText: React.CSSProperties = {
  fontSize: "14.5px",
  color: "#5a6478",
  lineHeight: "1.85",
  margin: "0 0 20px",
};

const buttonRow: React.CSSProperties = {
  margin: "0 0 12px",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#160b35",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  borderRadius: "8px",
  padding: "12px 24px",
};

const secondaryButton: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: "#160b35",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "underline",
  padding: "4px 0",
};

const divider: React.CSSProperties = {
  borderColor: "#e8e4dc",
  margin: "28px 0 24px",
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
