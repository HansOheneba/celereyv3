import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewsletterNotificationEmailProps {
  name?: string;
  email: string;
  date: string;
  sheetUrl: string;
}

export function NewsletterNotificationEmail({
  name,
  email,
  date,
  sheetUrl,
}: NewsletterNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New community lead: {email}</Preview>

      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            <Text className="text-xs font-bold tracking-widest uppercase text-slate-400 text-center m-0 mb-2">
              Celerey &mdash; Internal Alert
            </Text>

            <Section className="bg-slate-900 rounded-2xl px-8 py-10 text-center mt-2">
              <Heading className="text-white text-2xl font-bold mt-4 mb-2 leading-snug">
                New Lead Captured 📥
              </Heading>
              <Text className="text-slate-400 text-base m-0 leading-relaxed">
                Someone just joined the Celerey community.
              </Text>
            </Section>

            <Section className="bg-white rounded-2xl px-8 py-8 mt-4">
              <Text className="text-xs font-bold tracking-widest uppercase text-slate-400 m-0 mb-4">
                Lead Details
              </Text>

              <Section className="bg-slate-50 rounded-xl px-6 py-4 mb-2">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Email
                </Text>
                <Text className="text-slate-800 text-sm m-0">{email}</Text>
              </Section>

              <Section className="bg-slate-50 rounded-xl px-6 py-4 mb-2">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Name
                </Text>
                <Text className="text-slate-800 text-sm m-0">
                  {name || "—"}
                </Text>
              </Section>

              <Section className="bg-slate-50 rounded-xl px-6 py-4">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Date
                </Text>
                <Text className="text-slate-800 text-sm m-0">{date}</Text>
              </Section>

              <Hr className="border-slate-200 my-6" />

              <Text className="text-slate-600 text-sm leading-7 m-0">
                View the full subscriber list in Google Sheets:
              </Text>

              <Link
                href={sheetUrl}
                className="inline-block mt-3 px-5 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg no-underline"
              >
                Open Google Sheet &rarr;
              </Link>
            </Section>

            <Section className="mt-6 text-center">
              <Text className="text-xs text-slate-400 leading-relaxed m-0">
                &copy; {new Date().getFullYear()} Celerey. Internal use only.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewsletterNotificationEmail.PreviewProps = {
  name: "Alex Johnson",
  email: "alex@example.com",
  date: "15 April 2026, 14:32 UTC",
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/19q3Jmn1zj6CoVEjMf_0Il-Ia2MuNk9ZMmY0YG4YgOrc/edit?usp=sharing",
} satisfies NewsletterNotificationEmailProps;

export default NewsletterNotificationEmail;
