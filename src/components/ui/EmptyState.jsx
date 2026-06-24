/**
 * EmptyState Component
 * 
 * Displayed when a list has no items. Provides visual feedback
 * and an optional action button to guide the user.
 */

import Button from './Button';

const EmptyState = ({ icon, title, description, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-4 rounded-2xl bg-gray-800/50 p-4 text-4xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
