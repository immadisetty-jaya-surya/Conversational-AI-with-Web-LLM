import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import en from "./locales/en";
// eslint-disable-next-line react/prop-types
const Settings = ({open,onClose,onSave,onCancel,dispatch, clearAllData,settings}) => {
	const handleChange = (e) => {
		const {name, value, type, checked} = e.target;
		dispatch({
			type: 'UPDATE_SETTING',
			name,
			value: type === 'checkbox' ? checked : value,
		})
	}
	const handleSave = () => {
		onSave(settings)
    // onClose()
	}
  const handleCancel = () => {
    onCancel();
    // onClose()
  }
  const handleReset = () => {
    dispatch({type: 'RESET_SETTINGS'});
  }
  const handleClearData = () => {
    clearAllData();
    onClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
        <DialogTitle className="flex justify-center">Settings</DialogTitle>
        
        <div className="p-4 border border-black border-opacity-25 rounded-lg mx-4 bg-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.Temperature.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.Temperature.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="temperature" 
              value={settings.temperature}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="1"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.TopP.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.TopP.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="topP" 
              value={settings.topP}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="1"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.MaxTokens.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.MaxTokens.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="maxTokens" 
              value={settings.maxTokens}
              onChange={handleChange}
              step="1"
              min="1"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.PresencePenalty.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.PresencePenalty.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="presencePenalty" 
              value={settings.presencePenalty}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="2"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.FrequencyPenalty.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.FrequencyPenalty.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="frequencyPenalty" 
              value={settings.frequencyPenalty}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="2"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <label className="block text-lg">{en.Settings.InjectSystemPrompts.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.InjectSystemPrompts.SubTitle}</label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Off</span>
              <input 
                className="mr-2"
                type="checkbox" 
                name="injectSystemPrompts" 
                checked={settings.injectSystemPrompts}
                onChange={handleChange}
              />
              <span>On</span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.InputTemplate.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.InputTemplate.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="text"
              name="inputTemplate" 
              value={settings.inputTemplate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.HistoryCount.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.HistoryCount.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="attachedMessagesCount" 
              value={settings.attachedMessagesCount}
              onChange={handleChange}
              step="1"
              min="1"
              max="64"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="mr-4">
              <label className="block text-lg">{en.Settings.CompressThreshold.Title}</label>
              <label className="block text-sm text-gray-600">{en.Settings.CompressThreshold.SubTitle}</label>
            </div>
            <input 
              className="p-2 border rounded w-1/3"
              type="number" 
              name="historyCompressionThreshold" 
              value={settings.historyCompressionThreshold}
              onChange={handleChange}
              step="1"
              min="1"
            />
          </div>
        </div>
        <div className="flex mt-4 pb-6 w-96 justify-between mx-auto">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
          >
            Reset All Settings
          </Button>
          <Button 
            variant="contained"
            color="error"
            onClick={handleClearData}
          >
            Clear All Data
          </Button>
        </div>
        {/* <DialogActions>
          <Button onClick={handleCancel} color="secondary">cancel</Button>
          <Button onClick={handleSave} color="primary">save</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}

export default Settings