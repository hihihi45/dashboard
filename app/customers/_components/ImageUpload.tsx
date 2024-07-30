'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const [uploading, setUploading] = useState(false);

	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			setUploading(true);

			try {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', 'wlc5xgkl');

				const response = await fetch(
					`https://api.cloudinary.com/v1_1/dknnudbap/image/upload`,
					{
						method: 'POST',
						body: formData,
					}
				);

				if (!response.ok) {
					throw new Error('Upload failed');
				}

				const data = await response.json();
				onChange(data.secure_url);
			} catch (error) {
				console.error('Upload error:', error);
			} finally {
				setUploading(false);
			}
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onSuccess={handleUpload}
			uploadPreset='wlc5xgkl'
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className='relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed rounded-md border-neutral-300 p-2 text-neutral-600 hover:opacity-60 transition'
					>
						<TbPhotoPlus size={50} />
						<div className='font-semibold text-lg'>Click to upload</div>
						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image
									fill
									style={{ objectFit: 'cover' }}
									src={value}
									alt='Upload'
								/>
							</div>
						)}
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							className='hidden'
						/>
						{uploading && <div>Uploading...</div>}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
