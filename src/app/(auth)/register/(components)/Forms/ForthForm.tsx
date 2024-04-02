/* Components */
import { Card, CardBody } from "@nextui-org/react";

/* Types */
import { FormProps } from "../Form";

/* Forth Form: This will display the waiting for validation message to the client */
function ForthForm({ formData }: FormProps) {
  /* This function will be used to send the data to the server */
  function submitData() {
    console.log(formData);
  }

  submitData();

  return (
    <>
      <Card className="w-full mt-8 p-4 lg:p-8 h-full lg:h-4/6 ">
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
              process usually takes 24 hours. Once your account is approved, you
              will receive a confirmation email at the address you provided
              during registration. If you have any urgent inquiries or need
              assistance, feel free to contact us at{" "}
              <span className="italic">contact@skoolify.com</span>. Thank you
              for choosing <span>SKOOLIFY</span>!
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ForthForm;
