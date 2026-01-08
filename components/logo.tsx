import Image from 'next/image';

const Logo = () => {
  return (
    <div className='relative h-8 w-8'>
      <Image src='/logo.svg' alt='Zira PMS' fill className='object-contain' />
    </div>
  );
};

export default Logo;
