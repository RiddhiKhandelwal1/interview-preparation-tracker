import Button from './Button';

const EmptyState = ({ icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    {icon && <div className="mb-5 text-4xl opacity-60">{icon}</div>}
    <h3 className="text-base font-semibold text-zinc-300">{title}</h3>
    {description && <p className="mt-2 max-w-xs text-sm text-zinc-500">{description}</p>}
    {actionLabel && onAction && <Button onClick={onAction} className="mt-6" size="sm">{actionLabel}</Button>}
  </div>
);

export default EmptyState;
