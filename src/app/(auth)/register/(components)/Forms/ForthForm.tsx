"use client";
/* Utils */
import { useEffect, useState } from "react";

/* Components */
import { Card, CardBody, Spinner } from "@nextui-org/react";

/* Types */
import { FormProps } from "../Form";

/* Forth Form: This will display the waiting for validation message to the client */
function ForthForm({ formData }: FormProps) {
  const [loading, setLoading] = useState<number>(0);
  const data: string = JSON.stringify({
    username: formData
      ? `${String(formData.firstName)} ${String(formData.lastName)}`
      : "",
    email: String(formData?.email || ""),
    phone_number: formData?.phone || "",
    gender: String(formData?.gender || ""),
    birthday: String(formData?.dateOfBirth || ""),
    password: String(formData?.password || ""),
    modules_Groups_sessionNumber: formData?.subjects,
    role: String(formData?.role || ""),
    level: formData?.levels[0],
  });

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/addRequest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        const Data = await response.json();

        if (response.status == 400) {
          throw new Error(Data.error);
        } else {
          setTimeout(() => setLoading(1), 3000);
        }
      } catch (error: any) {
        setTimeout(() => setLoading(2), 3000);
      }
    };

    FetchData();
    console.log(data);
  }, [data]);

  switch (loading) {
    case 0:
      return (
        <div className="w-full mt-8 p-4 lg:p-8 h-full lg:h-4/6 flex item-center justify-center">
          <Spinner size="lg" color="primary" />
        </div>
      );

    case 1:
      return (
        <Card className="w-full mt-8 p-4 lg:p-8 h-full lg:h-4/6">
          <CardBody className="w-full h-full flex items-center justify-center gap-12">
            <div className="w-full flex flex-col justify-center items-start">
              <h1 className="text-3xl ml-6 mb-4">Registration Successful!</h1>
              <p className="text-lg">
                Thank you for registering with us. Your account has been created
                successfully.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="self-start text-2xl  ml-6 mb-4">
                What&apos;s Next?
              </h2>
              <p className="text-lg lg:indent-10 lg:px-4">
                Our team will now review the information you provided. This
                process usually takes 24 hours. Once your account is approved,
                you will receive a confirmation email at the address you
                provided during registration. If you have any urgent inquiries
                or need assistance, feel free to contact us at{" "}
                <span className="italic">contact@skoolify.com</span>. Thank you
                for choosing <span>SKOOLIFY</span>!
              </p>
            </div>
          </CardBody>
        </Card>
      );

    case 2:
      return (
        <div className="w-full h-full flex item-center justify-center">
          <h1>This email is already registered!</h1>
        </div>
      );
  }
}

export default ForthForm;
