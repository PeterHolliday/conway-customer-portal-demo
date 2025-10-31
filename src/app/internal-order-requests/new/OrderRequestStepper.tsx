// app/internal-order-requests/new/OrderRequestStepper.tsx
"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  internalOrderRequestZ,
  type InternalOrderRequest,
} from "@/schemas/internal-order-request";

import { Button } from "@/components/ui/button";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2DeliveryDetails from "./steps/Step2DeliveryDetails";
import Step3Materials from "./steps/Step3Materials";
import Step4ReviewSubmit from "./steps/Step4ReviewSubmit";
import { Stepper } from "@/components/stepper/Stepper";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type Step = {
  key: string;
  title: string;
  fields: (keyof InternalOrderRequest)[];
};

const steps: Step[] = [
  {
    key: "order",
    title: "Order Details",
    fields: [
      "companyRequestorName",
      "companyRequestorNumber",
      "siteContactName",
      "siteContactNumber",
      "companyName",
      "enteredBy",
    ],
  },
  {
    key: "delivery",
    title: "Delivery Details",
    fields: [
      "deliveryDate",
      "addressLine1",
      "addressLine2",
      "addressLine3",
      "addressLine4",
      "town",
      "postcode",
      "w3w",
      "deliveryInstructions",
    ],
  },
  { key: "materials", title: "Materials", fields: ["materials"] },
  { key: "review", title: "Review & Submit", fields: [] },
];

export default function OrderRequestStepper() {
  // const router = useRouter();

  const [displayDeliveryDay, setDisplayDeliveryDay] = useState<string>("");

  const form = useForm<InternalOrderRequest>({
    resolver: zodResolver(internalOrderRequestZ),
    mode: "onBlur",
    defaultValues: {
      companyRequestorName: "",
      companyRequestorNumber: "",
      siteContactName: "",
      siteContactNumber: "",
      companyName: "",
      deliveryInstructions: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      addressLine4: "",
      town: "",
      postcode: "",
      w3w: "",
      deliveryDate: new Date().toISOString().slice(0, 10),
      materials: [
        {
          tonnage: undefined,
          mixType: undefined,
          stoneSize: undefined,
          characteristic: undefined,
          layer: undefined,
          pen: "",
          psv: "",
          clause: "",
          areaCode: undefined,
          otherRef: "",
        },
      ],
      enteredBy: "",
      checkedBy: "",
    },
  });

  // Update delivery day when date changes
  useEffect(() => {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const update = (dateStr?: string) => {
      if (!dateStr) {
        setDisplayDeliveryDay("");
        return;
      }
      const d = new Date(dateStr + "T00:00:00");
      setDisplayDeliveryDay(names[d.getUTCDay()]);
    };
    update(form.getValues("deliveryDate"));
    const sub = form.watch((val, { name }) => {
      if (name === "deliveryDate") update(val?.deliveryDate);
    });
    return () => sub.unsubscribe();
  }, [form]);

  const [step, setStep] = useState(0);
  const progress = Math.round((step / (steps.length - 1)) * 100);

  function next() {
    setStep((c) => Math.min(c + 1, steps.length - 1));
  }
  function prev() {
    setStep((c) => Math.max(c - 1, 0));
  }

  //   async function onSubmitAll(data: InternalOrderRequest) {
  //     const reqDate = new Date().toISOString();
  //     let deliveryDay: InternalOrderRequest["deliveryDay"] | undefined;
  //     if (data.deliveryDate) {
  //       const d = new Date(data.deliveryDate + "T00:00:00");
  //       const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  //       deliveryDay = names[d.getUTCDay()] as InternalOrderRequest["deliveryDay"];
  //     }
  //     const payload = { ...data, date: reqDate, deliveryDay };
  //     console.log("Submitting InternalOrderRequest:", payload);
  //     alert("Order captured (UI only). Next: connect workflow & persistence.");
  //     router.push("/internal-order-requests");
  //   }
  const onSubmitAll: SubmitHandler<InternalOrderRequest> = async (data) => {
    const date = new Date().toISOString();

    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
    const deliveryDay =
      data.deliveryDate
        ? (names[new Date(data.deliveryDate + "T00:00:00").getUTCDay()] as InternalOrderRequest["deliveryDay"])
        : undefined;

    const payload = { ...data, date, deliveryDay };

    console.log("Submitting InternalOrderRequest:", payload);
    // await fetch("/api/internal-order-requests", { method:"POST", body: JSON.stringify(payload) })
  };
  return (

    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <Stepper
          steps={steps.map(({ key, title }) => ({ key, title }))}
          current={step}
        />
        <Badge className="min-w-24 justify-center bg-[#007e48] text-white">
          {progress}%
        </Badge>
      </div>
      <Progress value={progress} />

      {/* Nav Buttons */}
      <div className="flex justify-between pt-4">
        {step > 0 ? (
          <Button variant="outline" onClick={prev}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < steps.length - 1 ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmitAll)}>Submit</Button>
        )}
      </div>

      {/* Step content */}
      {step === 0 && <Step1OrderDetails form={form} onNext={next} />}
      {step === 1 && (
        <Step2DeliveryDetails
          form={form}
          deliveryDay={displayDeliveryDay}
          onBack={prev}
          onNext={next}
        />
      )}
      {step === 2 && <Step3Materials form={form} onBack={prev} onNext={next} />}
      {step === 3 && (
        <Step4ReviewSubmit
          form={form}
          deliveryDay={displayDeliveryDay}
          onNext={next}
        />
      )}
    </div>
    // </div>
  );
}
