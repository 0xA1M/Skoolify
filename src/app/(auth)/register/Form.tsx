"use client";
/* Utils */
import { Dispatch, SetStateAction } from "react";

/* Custom Components */
import { FirstForm, SecondForm, ThirdForm, ForthForm } from "./Forms";

/* Types */
export type FormDataType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: number;
  gender: string;
  role: string;
  level: string | string[];
  subjects: string[];
  group: number;
  password: string;
}; // This is the data schema that will followed.

export interface FormProps {
  step?: number;
  formData?: FormDataType;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
} // Function Parameters Types

function Form({ formData, step, setStep, setFormData }: FormProps) {
  /* Display the correct form according to the progress of the client */
  switch (step) {
    case 0:
      return <FirstForm setStep={setStep} setFormData={setFormData} />;
    case 1:
      return (
        <SecondForm
          formData={formData}
          setStep={setStep}
          setFormData={setFormData}
        />
      );
    case 2:
      return (
        <ThirdForm
          formData={formData}
          setStep={setStep}
          setFormData={setFormData}
        />
      );
    case 3:
      return <ForthForm />;
  }
}

export default Form;
