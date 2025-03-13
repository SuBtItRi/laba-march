import {
    useEffect,
    useState,
    useForm,
    EnumInputTypes,
    EnumVariants,
    Modal,
    Input,
    Textarea,
    useFileReader,
    useGetDoctorByIdQuery,
    usePatchDoctorMutation,
    useParams,
    toast,
    useDoctorValidation,
    IDoctorData,
    SubmitHandler,
    IButtonProps,
    fullNameFields,
    doctorFields,
    useGetSpecialitiesQuery,
    Select,
    ToastContainer,
} from '@/shared/types/DoctorUtils/doctorUpdate'
import styles from './UpdateDoctor.module.scss'

function App({ closeFn }: { closeFn: () => void }) {
    const { id } = useParams()
    const { data: doctorData } = useGetDoctorByIdQuery(id!, { skip: !id })
    const [patchDoctor] = usePatchDoctorMutation()
    const [isOpen, setIsOpen] = useState(true)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const avatarPreview = useFileReader(selectedFile)
    const { validateDoctorData } = useDoctorValidation()
    const { data: specialitiesData } = useGetSpecialitiesQuery(10)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isDirty },
    } = useForm<IDoctorData>({
        defaultValues: {
            user: {
                first_name: '',
                last_name: '',
                surname: '',
            },
            speciality: '',
            experience: 0,
            cabinet: 0,
            description: '',
        },
    })

    useEffect(() => {
        if (doctorData && specialitiesData) {
            const currentSpeciality = specialitiesData.results.find(
                (s: { title: string }) => s.title === doctorData.speciality,
            )

            setValue('user.first_name', doctorData.user.first_name || '')
            setValue('user.last_name', doctorData.user.last_name || '')
            setValue('user.surname', doctorData.user.surname || '')
            setValue('speciality', currentSpeciality?.id || '')
            setValue('experience', doctorData.experience || 0)
            setValue('cabinet', doctorData.cabinet || 0)
            setValue('description', doctorData.description || '')
            setValue('user.first_name', doctorData.user.first_name || '')
            setValue('user.last_name', doctorData.user.last_name || '')
            setValue('user.surname', doctorData.user.surname || '')
            setValue('speciality', doctorData.speciality || '')
            setValue('experience', doctorData.experience || 0)
            setValue('cabinet', doctorData.cabinet || 0)
            setValue('description', doctorData.description || '')
            if (doctorData.user.avatar) {
                setSelectedFile(doctorData.user.avatar as File)
            }
        }
    }, [doctorData, specialitiesData, setValue])

    const formatErrorMessages = (errors: Record<string, string[]>): string => {
        let errorMessage = ''

        for (const key in errors) {
            if (Array.isArray(errors[key])) {
                errorMessage += errors[key].join('\n') + '\n'
            } else if (typeof errors[key] === 'object' && errors[key] !== null) {
                errorMessage += formatErrorMessages(errors[key])
            }
        }

        return errorMessage.trim()
    }

    const onSubmit: SubmitHandler<IDoctorData> = async (data) => {
        if (!validateDoctorData(data)) return

        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'user') {
                formData.append(key, value.toString())
            }
        })

        Object.entries(data.user).forEach(([key, value]) => {
            if (key === 'avatar' && selectedFile) {
                if (selectedFile instanceof File) formData.append(`user.${key}`, selectedFile)
            } else if (key !== 'avatar') {
                formData.append(`user.${key}`, value.toString())
            }
        })

        try {
            await patchDoctor({ id, data: formData }).unwrap()
            toast.success('Данные врача успешно обновлены')
            handleCloseModal()
        } catch (error) {
            if (error && typeof error === 'object' && 'data' in error) {
                const errorData = error.data as Record<string, string[]>
                const errorMessage = formatErrorMessages(errorData)
                toast.error(errorMessage)
            } else {
                toast.error('Произошла неизвестная ошибка')
            }
        }
    }

    const handleCloseModal = () => {
        setIsOpen(false)
        closeFn()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setSelectedFile(file)
        if (file) {
            setValue('user.avatar', file)
        }
    }

    const buttons: IButtonProps[] = [
        {
            value: 'Закрыть',
            disabled: false,
            onClick: handleCloseModal,
            variant: EnumVariants.DEFAULT,
            className: styles.button,
        },
        {
            value: 'Сохранить',
            disabled: !isDirty,
            type: 'submit',
            variant: EnumVariants.DEFAULT,
            className: styles.button,
            onClick: handleSubmit(onSubmit),
        },
    ]

    return (
        <>
            <Modal isOpen={isOpen} title='Изменение информации' buttons={buttons}>
                <form className={styles.container}>
                    <div className={styles.profile}>
                        <div className='flex flex-col items-center space-y-2'>
                            <Input
                                type={EnumInputTypes.FILE}
                                label='Аватар'
                                hidden={true}
                                imageUrl={avatarPreview as string}
                                {...register('user.avatar')}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className={styles.desc}>
                            <div className={styles.full_name}>
                                {fullNameFields.map((input, index) => (
                                    <Input
                                        key={`${index}-${input.name}`}
                                        {...input}
                                        {...register(
                                            input.name as
                                                | 'user.last_name'
                                                | 'user.first_name'
                                                | 'user.surname',
                                        )}
                                    />
                                ))}
                            </div>
                            {doctorFields.map((input, index) => (
                                <Input
                                    key={`${index}-${input.name}`}
                                    {...input}
                                    {...register(
                                        input.name as 'speciality' | 'experience' | 'cabinet',
                                    )}
                                />
                            ))}
                            <Select
                                label='Специальность'
                                options={
                                    specialitiesData?.results.map(
                                        (s: { id: string; title: string }) => ({
                                            value: s.id,
                                            label: s.title,
                                            text: s.title,
                                        }),
                                    ) || []
                                }
                                {...register('speciality')}
                                onChange={(e) => setValue('speciality', e.target.value)}
                            />
                        </div>
                    </div>
                    <Textarea
                        label='Дополнительная информация'
                        placeholder='Дополнительная информация'
                        {...register('description')}
                    />
                </form>
            </Modal>
            <ToastContainer />
        </>
    )
}
export default App
