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

interface ConsultationNotificationEmailProps {
  name: string;
  email: string;
  goal: string;
  date: string;
  sheetUrl: string;
}

export function ConsultationNotificationEmail({
  name,
  email,
  goal,
  date,
  sheetUrl,
}: ConsultationNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New consultation request from {name}</Preview>

      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            <Text className="text-xs font-bold tracking-widest uppercase text-slate-400 text-center m-0 mb-2">
              Celerey &mdash; Internal
            </Text>

            <Section className="bg-slate-900 rounded-2xl px-8 py-10 text-center mt-2">
              <Heading className="text-white text-2xl font-bold mt-4 mb-2 leading-snug">
                New Consultation Request
              </Heading>
              <Text className="text-slate-400 text-base m-0 leading-relaxed">
                Someone has signed up for a free advisory consultation.
              </Text>
            </Section>

            <Section className="bg-white rounded-2xl px-8 py-8 mt-4">
              <Text className="text-xs font-bold tracking-widest uppercase text-slate-400 m-0 mb-4">
                Submission Details
              </Text>

              <Section className="bg-slate-50 rounded-xl px-6 py-4 mb-2">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Full Name
                </Text>
                <Text className="text-slate-800 text-sm m-0">{name}</Text>
              </Section>

              <Section className="bg-slate-50 rounded-xl px-6 py-4 mb-2">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Email
                </Text>
                <Text className="text-slate-800 text-sm m-0">
                  <Link
                    href={`mailto:${email}`}
                    className="text-slate-800 underline"
                  >
                    {email}
                  </Link>
                </Text>
              </Section>

              <Section className="bg-amber-50 rounded-xl px-6 py-4 mb-2">
                <Text className="text-amber-700 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  What they hope to achieve
                </Text>
                <Text className="text-slate-800 text-sm m-0 leading-relaxed whitespace-pre-wrap">
                  {goal}
                </Text>
              </Section>

              <Section className="bg-slate-50 rounded-xl px-6 py-4">
                <Text className="text-slate-500 text-xs font-semibold uppercase tracking-widest m-0 mb-1">
                  Submitted
                </Text>
                <Text className="text-slate-800 text-sm m-0">{date}</Text>
              </Section>

              <Hr className="border-slate-200 my-6" />

              <Text className="text-slate-600 text-sm leading-7 m-0">
                View the full consultation log in Google Sheets:
              </Text>

              <Link
                href={sheetUrl}
                className="inline-block mt-3 px-5 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg no-underline"
              >
                Open Consultation Sheet &rarr;
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

ConsultationNotificationEmail.PreviewProps = {
  name: "Alex Johnson",
  email: "alex@example.com",
  goal: "I want to understand how to start investing with my savings and what I should prioritise first.",
  date: "16 Apr 2026, 14:30:00 UTC",
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/19q3Jmn1zj6CoVEjMf_0Il-Ia2MuNk9ZMmY0YG4YgOrc/edit",
} satisfies ConsultationNotificationEmailProps;

export default ConsultationNotificationEmail;
