export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const Tag = Component;

  return (
    <Tag
      className={`tmx-button tmx-button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
