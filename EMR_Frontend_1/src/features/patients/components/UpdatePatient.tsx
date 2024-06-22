// components/UpdatePatient.tsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextInput,
  MultiSelect,
  Stack,
  NumberInput,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUpdatePatient } from "../api/update-patient";
import { IPatient } from "../model/IPatient";
import useGetPatients from "../api/get-all-patients";

interface UpdatePatientProps {
  patient: IPatient;
}

const UpdatePatient: React.FC<UpdatePatientProps> = ({ patient }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IPatient>({
    defaultValues: {
      ...patient,
      diseases: patient.diseases.map(disease => ({ _id: disease._id })),
      doctors: patient.doctors.map(doctor => ({ _id: doctor._id })),
    },
  });

  const mutation = useUpdatePatient();

  const onSubmit = (data: IPatient) => {
    const transformedData = {
      ...data,
      diseases: data.diseases.map(disease => disease._id),
      doctors: data.doctors.map(doctor => doctor._id)
    };
    mutation.mutate(transformedData);
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Patient">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextInput
                  label="Name"
                  placeholder="Enter patient name"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              name="age"
              control={control}
              rules={{ required: "Age is required", min: 1 }}
              render={({ field }) => (
                <NumberInput
                  label="Age"
                  placeholder="Enter patient age"
                  {...field}
                  error={
                    errors.age
                      ? "Age is required and must be a positive number"
                      : null
                  }
                />
              )}
            />

            <Controller
              name="diseases"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  data={/* diseaseOptions from API */}
                  label="Diseases"
                  placeholder="Select diseases"
                  value={field.value.map((disease: any) => disease._id)}
                  onChange={(values) =>
                    field.onChange(values.map((id) => ({ _id: id })))
                  }
                  error={
                    errors.diseases && "Please select at least one disease"
                  }
                />
              )}
            />

            <Controller
              name="doctors"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  data={/* doctorOptions from API */}
                  label="Doctors"
                  placeholder="Select doctors"
                  value={field.value.map((doctor: any) => doctor._id)}
                  onChange={(values) =>
                    field.onChange(values.map((id) => ({ _id: id })))
                  }
                  error={errors.doctors && "Please select at least one doctor"}
                />
              )}
            />

            <div className="flex flex-row gap-6 justify-end">            
              <Button onClick={close}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </Stack>
        </form>
      </Modal>

      <Stack align="center">
        <Button onClick={open}>Edit Patient</Button>
      </Stack>
    </>
  );
};

export default UpdatePatient;
