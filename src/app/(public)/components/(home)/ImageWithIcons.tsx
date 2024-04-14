import Image from 'next/image';

interface ImageData {
    src: string;
    width: number;
    height: number;
    position: string;
  }
  
interface ImageWithIconsProps {
    images: ImageData[];
}

const ImageWithIcons: React.FC<ImageWithIconsProps> = ({ images }) => {
    return (
    <>
    {images.map((image, index) => (
      <div
        key={index}
        className={`absolute ${image.position} z-0 hidden md:block`}
      >
        <Image
          src={`/images/mainIcons/${image.src}`}
          width={image.width}
          height={image.height}
          alt="Image"
          className="w-full"
        />
      </div>
        ))}
    </>
  )
}

export default ImageWithIcons