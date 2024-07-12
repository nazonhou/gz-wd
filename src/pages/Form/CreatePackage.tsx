import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import TextInput from '../../components/Forms/TextInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useRequest from '../../hooks/useRequest';

const CreatePackage = () => {
  const { errorMessage, validationErrors, response, send } = useRequest({
    method: 'post',
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Package" />

      <div className="p-4 dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          {/* <!-- Alerts Item --> */}
          {response?.data && (
            <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="<http://www.w3.org/2000/svg>"
                >
                  <path
                    d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                    fill="white"
                    stroke="white"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                  Operation Success
                </h5>
                <p className="text-base leading-relaxed text-body">
                  Package created successflully
                </p>
              </div>
            </div>
          )}
          {/* <!-- Alerts Item --> */}
          {errorMessage && (
            <>
              <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="<http://www.w3.org/2000/svg>"
                  >
                    <path
                      d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                    ></path>
                  </svg>
                </div>
                <div className="w-full">
                  <h5 className="mb-3 font-semibold text-[#B45454]">
                    Something went wrong
                  </h5>
                  <ul>
                    <li className="leading-relaxed text-[#CD5D5D]">
                      {errorMessage}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Formik
        initialValues={{
          description: '',
          weight: 0,
          width: 0,
          height: 0,
          depth: 0,
          from_name: '',
          from_address: '',
          from_location: '',
          to_name: '',
          to_address: '',
          to_location: '',
        }}
        validationSchema={Yup.object({
          description: Yup.string().required('Required'),
          weight: Yup.number().moreThan(0).required('Required'),
          width: Yup.number().moreThan(0).required('Required'),
          height: Yup.number().moreThan(0).required('Required'),
          depth: Yup.number().moreThan(0).required('Required'),
          from_name: Yup.string().required('Required'),
          from_address: Yup.string().required('Required'),
          from_location: Yup.string().required('Required'),
          to_name: Yup.string().required('Required'),
          to_address: Yup.string().required('Required'),
          to_location: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          send({
            url: '/package',
            data: values,
            onSuccess: () => {
              resetForm();
            },
            onfinally: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="p-6.5">
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['description'] ?? []}
                        label="Description"
                        name="description"
                        type="text"
                        placeholder="Enter the package description"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['weight'] ?? []}
                        label="Weight"
                        name="weight"
                        type="number"
                        placeholder="Enter the weight"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['width'] ?? []}
                        label="Width"
                        name="width"
                        type="number"
                        placeholder="Enter the width"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['height'] ?? []}
                        label="Height"
                        name="height"
                        type="number"
                        placeholder="Enter the height"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['depth'] ?? []}
                        label="Depth"
                        name="depth"
                        type="number"
                        placeholder="Enter the depth"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['from_name'] ?? []}
                        label="Sender"
                        name="from_name"
                        type="text"
                        placeholder="Enter the sender name"
                      />
                    </div>
                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['from_address'] ?? []}
                        label="Starting address"
                        name="from_address"
                        type="text"
                        placeholder="Enter the starting address"
                      />
                    </div>

                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['from_location'] ?? []}
                        label="From location"
                        name="from_location"
                        type="text"
                        placeholder="Expected format is 'lat,lng'"
                      />
                    </div>

                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['to_name'] ?? []}
                        label="Recipient"
                        name="to_name"
                        type="text"
                        placeholder="Enter the recipient name"
                      />
                    </div>

                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['to_address'] ?? []}
                        label="Destination address"
                        name="to_address"
                        type="text"
                        placeholder="Enter the destination address"
                      />
                    </div>

                    <div className="mb-4.5">
                      <TextInput
                        errors={validationErrors['to_location'] ?? []}
                        label="To location"
                        name="to_location"
                        type="text"
                        placeholder="Expected format is 'lat,lng'"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      {isSubmitting ? '...' : 'Create package'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default CreatePackage;
