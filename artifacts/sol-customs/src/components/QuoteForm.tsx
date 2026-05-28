// Sol Customs — Web3Forms-backed quote form.
//
// IMPORTANT: Before going live, replace WEB3FORMS_ACCESS_KEY below with the
// real public access key from https://web3forms.com (free tier is fine).
// The form posts directly from the browser to https://api.web3forms.com/submit
// and Web3Forms emails the submission to the address configured in their
// dashboard. There is no backend / serverless function involved.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const QUOTE_ENDPOINT = "/.netlify/functions/quote";

const SERVICE_OPTIONS = [
  "Vehicle Wrap",
  "Colored PPF",
  "Commercial Wrap",
  "Custom Lighting",
  "Engravings",
  "Aero Install",
  "Aftermarket Parts",
  "Other",
] as const;

const CONTACT_METHODS = ["Call", "Text", "Email"] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^\+?[\d\s\-().]+$/, "Phone number contains invalid characters")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must have at least 10 digits",
    ),
  vehicle: z.string().min(2, "Vehicle year, make, and model are required"),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: "Please select a service" }),
  }),
  preferredContact: z.enum(CONTACT_METHODS, {
    errorMap: () => ({ message: "Please select a preferred contact method" }),
  }),
  message: z.string().optional(),
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function QuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicle: "",
      service: undefined as unknown as FormValues["service"],
      preferredContact: "Call",
      message: "",
      botcheck: "",
    },
  });

  async function onSubmit(values: FormValues) {
    // Honeypot: if a bot filled the hidden field, silently pretend success.
    if (values.botcheck) {
      form.reset();
      setSubmitted(true);
      return;
    }

    setIsPending(true);
    try {
      const res = await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject: "New Quote Request — Sol Customs",
          from_name: "Sol Customs Website",
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          vehicle: values.vehicle,
          service: values.service,
          preferred_contact: values.preferredContact,
          message: values.message ?? "",
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data?.success) {
        form.reset();
        setSubmitted(true);
      } else {
        throw new Error(data?.message || "Web3Forms returned an error");
      }
    } catch {
      toast({
        title: "Error",
        description:
          "Something went wrong. Please call or text Sol Customs directly.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section id="quote" className="py-24 bg-card relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Get a Free Quote
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Ready to transform your vehicle? Tell Sol Customs what you drive
            and what service you're interested in. The team will review your
            request and reach out with the next steps.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border p-12 text-center rounded-xl"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Thank you!
            </h3>
            <p className="text-muted-foreground">
              Your quote request has been sent. Sol Customs will contact you soon.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Honeypot — hidden from real users */}
                <div
                  className="opacity-0 absolute -left-[9999px] top-0"
                  aria-hidden="true"
                >
                  <FormField
                    control={form.control}
                    name="botcheck"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-background border-border"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="bg-background border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 555-5555"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="bg-background border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Year / Make / Model *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2024 Porsche 911"
                            className="bg-background border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border text-foreground">
                            {SERVICE_OPTIONS.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="How should we reach you?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border text-foreground">
                            {CONTACT_METHODS.map((method) => (
                              <SelectItem key={method} value={method}>
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message / Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your vision..."
                          className="min-h-[120px] bg-background border-border resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(179,30,60,0.4)] transition-all"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
