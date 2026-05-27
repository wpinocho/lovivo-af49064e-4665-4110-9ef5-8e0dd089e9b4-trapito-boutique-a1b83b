interface TrapitoBrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const TrapitoBrandLogo = ({ variant = 'dark', size = 'md' }: TrapitoBrandLogoProps) => {
  const heights = { sm: 'h-7', md: 'h-9', lg: 'h-12' };

  return (
    <a href="/" aria-label="Trapito — babywear mexicano contemporáneo" className="flex flex-col items-center group">
      <img
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png"
        alt="Trapito"
        className={`${heights[size]} w-auto object-contain`}
        style={variant === 'light' ? { filter: 'brightness(0) invert(1)' } : undefined}
      />
      <span
        className="text-[9px] font-inter font-medium tracking-[0.18em] uppercase mt-0.5"
        style={{ color: variant === 'light' ? 'hsl(33 57% 92% / 0.7)' : 'hsl(21 16% 37%)' }}
      >
        babywear mexicano contemporáneo
      </span>
    </a>
  );
};