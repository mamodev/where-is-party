"use client";

import { Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const formValuesSchema = z.object({
  name: z.string().nonempty(),
  date: z.date().nullable(),
  openDate: z.date().nullable(),
  visibleDate: z.date().nullable(),
  closeDate: z.date().nullable(),
  image: z.any(),
  location: z.string().nullable(),
  theme: z.string().nullable(),
  themeConfig: z.any().nullable(),
});

type FormValues = z.infer<typeof formValuesSchema>;

const initialValues: FormValues = {
  name: "",
  date: null,
  openDate: null,
  visibleDate: null,
  closeDate: null,
  image: null,
  location: "798c4ddb-2c9f-478e-8610-b3397ec527c1",
  theme: "dc7f7600-81ac-49a7-a625-1c0b1274957a",
  themeConfig: {},
};

export default function EventForm() {
  const handleSubmit = (data: FormValues) => {
    if (!data.name || !data.date || !data.openDate || !data.closeDate) return;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(formValuesSchema)}
      onSubmit={(data) => {}}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p>Crea evento</p>

          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nome evento"
          />
          <p>Data evento</p>
          <Field name="date" type="date" className="" />
          <p>Data apertura prenotazioni</p>
          <Field name="openDate" type="date" className="" />
          <p>Data chiusura prenotazioni</p>
          <Field name="closeDate" type="date" className="" />
          <p>Data uscita evento</p>
          <Field name="visibleDate" type="date" className="" />
          <p>Immagine evento</p>
          <Field name="image" type="file" />
        </form>
      )}
    </Formik>
  );
}
