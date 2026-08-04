import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  message: z.string().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        city: data.city,
        message: data.message,
      },
    });

    // Send notification email to the admin
    try {
      const settings = await prisma.settings.findUnique({ where: { id: "settings" } });
      const adminEmail = settings?.ownerEmail || "mudassirchadhar789@gmail.com";

      await sendEmail({
        to: adminEmail,
        subject: `New Customer Inquiry: ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Inquiry Received</h2>
            <p style="font-size: 16px; color: #4a5568;">You have received a new inquiry from the contact form on your website.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f7fafc;">
                <td style="padding: 10px; font-weight: bold; width: 120px; border-bottom: 1px solid #edf2f7;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7;">
                  <a href="tel:${data.phone}" style="color: #3182ce; text-decoration: none;">${data.phone}</a>
                </td>
              </tr>
              <tr style="background-color: #f7fafc;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7;">
                  ${data.email ? `<a href="mailto:${data.email}" style="color: #3182ce; text-decoration: none;">${data.email}</a>` : "<em>Not provided</em>"}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #edf2f7;">City:</td>
                <td style="padding: 10px; border-bottom: 1px solid #edf2f7;">${data.city || "<em>Not provided</em>"}</td>
              </tr>
            </table>
            <div style="margin-top: 30px; padding: 15px; background-color: #ebf8ff; border-left: 4px solid #3182ce; border-radius: 4px;">
              <h4 style="margin: 0 0 10px 0; color: #2b6cb0;">Message:</h4>
              <p style="margin: 0; color: #2d3748; white-space: pre-line; line-height: 1.5;">${data.message}</p>
            </div>
            <p style="font-size: 12px; color: #a0aec0; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This notification was generated automatically from your website contact form.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send inquiry notification email:", emailErr);
      // We do not fail the API request if only the email notification fails
    }

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}
