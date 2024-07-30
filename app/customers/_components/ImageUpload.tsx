'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

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

	return (
		<CldUploadWidget
			onSuccess={handleUpload}
			uploadPreset='your-upload-preset' // Use the correct preset configured in Cloudinary
		>
			{({ open }) => (
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
						className='hidden'
					/>
					{uploading && <div>Uploading...</div>}
				</div>
			)}
		</CldUploadWidget>
	);
};

export default ImageUpload;
