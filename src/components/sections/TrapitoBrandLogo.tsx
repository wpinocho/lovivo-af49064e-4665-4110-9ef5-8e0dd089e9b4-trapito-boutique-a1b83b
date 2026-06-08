interface TrapitoBrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

const textSizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export const TrapitoBrandLogo = ({ variant = 'dark', size = 'md' }: TrapitoBrandLogoProps) => {
  if (variant === 'light') {
    return (
      <a href="/" aria-label="Trapito — ropa creada para ellos, pensada en tus raíces" className="flex flex-col items-start group">
        <span
          className={`font-fraunces font-semibold italic tracking-tight leading-none ${textSizes[size]}`}
          style={{ color: 'hsl(33 57% 92%)' }}
        >
          Trapito
        </span>
        <span
          className="text-[9px] font-inter font-medium tracking-[0.18em] uppercase mt-1"
          style={{ color: 'hsl(33 57% 92% / 0.55)' }}
        >
          ropa creada para ellos, pensada en tus raíces
        </span>
      </a>
    );
  }

  const heights = { sm: 'h-7', md: 'h-9', lg: 'h-12' };

  return (
    <a href="/" aria-label="Trapito — ropa creada para ellos, pensada en tus raíces" className="flex flex-col items-center group">
      <img
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png"
        alt="Trapito"
        className={`${heights[size]} w-auto object-contain`}
      />
      <span
        className="text-[9px] font-inter font-medium tracking-[0.18em] uppercase mt-0.5"
        style={{ color: 'hsl(21 16% 37%)' }}
      >
        ropa creada para ellos, pensada en tus raíces
      </span>
    </a>
  );
};