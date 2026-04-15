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

interface NewsletterWelcomeEmailProps {
  name?: string;
  email: string;
}

export function NewsletterWelcomeEmail({
  name,
  email,
}: NewsletterWelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Good to have you here.</Preview>

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

          {/* Body card */}
          <Section style={card}>
            <Text style={headline}>Good to have you here.</Text>
            <Text style={bodyText}>
              You've joined a community thinking more clearly about money. From
              time to time, we'll share briefings, perspectives, and resources
              worth your attention. That's it.
            </Text>

            {/* Centerpiece image */}
            <Section style={featureImageSection}>
              {/* Hero image */}
              <Img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1120&q=80&fit=crop"
                alt=""
                width="80%"
                style={heroImg}
              />
            </Section>

            <Text style={brandNote}>
              We are democratizing access to global advisory so more people can
              make confident financial decisions.
            </Text>

            <Section style={socialRow}>
              <Link
                href="https://www.linkedin.com/company/celerey"
                style={socialLink}
              >
                LinkedIn
              </Link>
              <Text style={socialDot}>•</Text>
              <Link
                href="https://www.instagram.com/celerey.co/"
                style={socialLink}
              >
                Instagram
              </Link>
              <Text style={socialDot}>•</Text>
              <Link href="https://wa.me/12272296921" style={socialLink}>
                WhatsApp
              </Link>
            </Section>

            <Hr style={divider} />

            <Text style={nextLabel}>While you're here</Text>

            <Section style={buttonRow}>
              <Link
                href="https://celerey.co/resources/podcasts"
                style={resourceButton}
              >
                Explore the Podcast
              </Link>
            </Section>

            <Section style={buttonRow}>
              <Link
                href="https://celerey.co/resources/guides"
                style={resourceButton}
              >
                Read Our Guides
              </Link>
            </Section>

            <Section style={buttonRow}>
              <Link
                href="https://celerey.co/resources/market-insights"
                style={resourceButton}
              >
                View Market Insights
              </Link>
            </Section>

            <Text style={signOff}>Celerey</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this because you joined at{" "}
              <Link href="https://celerey.co" style={footerLink}>
                celerey.co
              </Link>
              .<br />
              <Link href="#" style={footerLink}>
                Unsubscribe
              </Link>{" "}
              ·{" "}
              <Link href="mailto:info@celerey.co" style={footerLink}>
                info@celerey.co
              </Link>
              <br />
              Sent to {email} · © {new Date().getFullYear()} Celerey
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NewsletterWelcomeEmail.PreviewProps = {
  name: "Alex",
  email: "tech@celerey.co",
} satisfies NewsletterWelcomeEmailProps;

export default NewsletterWelcomeEmail;

// ── Styles ──────────────────────────────────────────────

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

const heroImg: React.CSSProperties = {
  borderRadius: "14px",
  display: "block",
  width: "100%",
  objectFit: "cover",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "36px 40px",
  marginTop: "10px",
};

const headline: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "400",
  color: "#0f1c2e",
  lineHeight: "1.25",
  fontFamily: "Georgia, Times New Roman, serif",
  margin: "0 0 16px",
};

const bodyText: React.CSSProperties = {
  fontSize: "14.5px",
  color: "#5a6478",
  lineHeight: "1.85",
  margin: "0 0 20px",
};

const featureImageSection: React.CSSProperties = {
  marginBottom: "24px",
  textAlign: "center",
};

const brandNote: React.CSSProperties = {
  fontSize: "14px",
  color: "#5a6478",
  lineHeight: "1.8",
  margin: "0 0 14px",
  textAlign: "center",
};

const socialRow: React.CSSProperties = {
  marginBottom: "12px",
  textAlign: "center",
};

const socialLink: React.CSSProperties = {
  color: "#0f1c2e",
  fontSize: "13px",
  textDecoration: "underline",
};

const socialDot: React.CSSProperties = {
  color: "#9aa2b1",
  display: "inline-block",
  margin: "0 8px",
};

const featureImage: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid #e9e6df",
  padding: "12px",
  backgroundColor: "#faf8f4",
  margin: "0 auto",
  display: "block",
};

const divider: React.CSSProperties = {
  borderColor: "#eae8e2",
  margin: "24px 0",
};

const nextLabel: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#aaa",
  margin: "0 0 12px",
};

const buttonRow: React.CSSProperties = {
  marginBottom: "10px",
};

const resourceButton: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "center",
  padding: "12px 16px",
  borderRadius: "999px",
  border: "1px solid #e6e2da",
  backgroundColor: "#f8f6f1",
  color: "#0f1c2e",
  fontSize: "13px",
  fontWeight: "500",
  textDecoration: "none",
  letterSpacing: "0.02em",
};

const signOff: React.CSSProperties = {
  fontSize: "14px",
  color: "#0f1c2e",
  marginTop: "28px",
  marginBottom: "0",
  textAlign: "right",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  paddingTop: "24px",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  color: "#b0b0b0",
  lineHeight: "1.9",
};

const footerLink: React.CSSProperties = {
  color: "#999",
  textDecoration: "underline",
};
