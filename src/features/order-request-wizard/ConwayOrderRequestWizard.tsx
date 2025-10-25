"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Stepper } from "@/components/stepper/Stepper";
import { FullSchema, type FormValues } from "@/schemas/order";
import { StepDetails } from "./steps/StepDetails";
import { StepCollections } from "./steps/StepCollections";
import { StepReview } from "./steps/StepReview";

const steps = [
  { key: "details", title: "Order details", trigger: ["collectionDate", "location", "siteContact", "poReference"] },
  { key: "collections", title: "Collections", trigger: ["collections"] },
  { key: "review", title: "Review & submit", trigger: ["collectionDate", "location", "siteContact", "collections"] },
] as const;

const PRODUCTS = ["AC 10 Open Surf 100/150 HS", "AC 20 Dense Bin 100/150", "AC 32 Base 160/220", "HRA 55/10 F Surf 100/150"];
const LOCATIONS = ["HEATHROW", "ALDERSHOT", "CHELSFIELD"];
const CONTACTS = ["Sandra Barney", "John Smith", "Alex Patel"];

export default function ConwayOrderWizard() {
  const form = useForm<FormValues>({
  resolver: zodResolver(FullSchema), 
  defaultValues: {
    collectionDate: "",
    location: "",
    siteContact: "",
    poReference: "",
    collections: [
      { products: [{ product: PRODUCTS[0], quantity: 2 }], time: "06:00" }, // quantity is a number
    ],
  },
  mode: "onChange",
});


  const [step, setStep] = useState(0);
  const progress = Math.round((step / (steps.length - 1)) * 100);

  const next = async () => {
    const ok = await form.trigger(steps[step].trigger as any, { shouldFocus: true });
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const ok = await form.trigger(steps[2].trigger as any, { shouldFocus: true });
    if (ok) {
      const values = form.getValues();
      console.log("Submitted order payload:", values);
      alert("✅ Order submitted (check console for payload)");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <Stepper steps={steps.map(({ key, title }) => ({ key, title }))} current={step} />
        <Badge className="min-w-24 justify-center bg-[#007e48] text-white">{progress}%</Badge>
      </div>
      <Progress value={progress} />

      {step === 0 && <StepDetails form={form} LOCATIONS={LOCATIONS} CONTACTS={CONTACTS} onNext={next} />}
      {step === 1 && <StepCollections form={form} PRODUCTS={PRODUCTS} onBack={prev} onNext={next} />}
      {step === 2 && <StepReview form={form} onBack={prev} onSubmit={submit} />}
    </div>
  );
}
