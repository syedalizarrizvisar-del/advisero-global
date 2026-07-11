import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(APPLICATIONS_FILE);
  } catch {
    await fs.writeFile(APPLICATIONS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

async function readApplications(): Promise<unknown[]> {
  await ensureFile();
  const content = await fs.readFile(APPLICATIONS_FILE, "utf8");
  try {
    return JSON.parse(content) as unknown[];
  } catch {
    return [];
  }
}

async function writeApplications(items: unknown[]) {
  await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(items, null, 2), "utf8");
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid form submission." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const required = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "interest",
    "competencies",
  ];

  for (const field of required) {
    const value = form.get(field);
    const isEmpty = !value || (typeof value === "string" && value.trim() === "");
    if (isEmpty) {
      return new Response(
        JSON.stringify({ ok: false, error: `Missing required field: ${field}.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  const file = form.get("cv");
  const fileName = file && typeof file === "object" && "name" in file ? (file as File).name : null;

  const applications = await readApplications();
  const application = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    firstName: form.get("firstName"),
    lastName: form.get("lastName"),
    gender: form.get("gender"),
    nationality: form.get("nationality"),
    visaStatus: form.get("visaStatus"),
    dob: form.get("dob"),
    email: form.get("email"),
    phone: form.get("phone"),
    address: form.get("address"),
    experience: form.get("experience"),
    interest: form.get("interest"),
    competencies: form.get("competencies"),
    cvFileName: fileName,
  };
  await writeApplications([...applications, application]);

  return new Response(JSON.stringify({ ok: true, application }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
