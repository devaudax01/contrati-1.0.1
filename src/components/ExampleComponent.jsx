import { showToast } from '../utils/toast';

export const ExampleComponent = () => {
  const handleAction = async () => {
    try {
      await showToast.promise(
        // Your async operation here
        saveData(),
        {
          loading: 'Saving...',
          success: 'Data saved successfully!',
          error: 'Failed to save data'
        }
      );
    } catch (error) {
      showToast.error(error.message);
    }
  };

  return (
    <button onClick={handleAction}>
      Save Changes
    </button>
  );
}; 