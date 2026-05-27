export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Trapito — babywear mexicano contemporáneo" className="flex flex-col items-center">
      <img
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png"
        alt="Trapito"
        className="h-8 w-auto object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span style="font-family: Georgia, serif; font-size: 20px; font-weight: 400; color: hsl(72 36% 34%);">TRAPITO</span>';
        }}
      />
    </a>
  );
};