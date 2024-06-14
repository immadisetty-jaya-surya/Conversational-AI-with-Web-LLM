import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";

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
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Temperature</InputLabel>
            <TextField 
              type="number" 
              name="temperature" 
              value={settings.temperature}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0,max:1}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Top P</InputLabel>
            <TextField
              type="number" 
              name="maxTokens" 
              value={settings.topP}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:1}}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Max Tokes</InputLabel>
            <TextField
              type="number" 
              name="maxTokens" 
              value={settings.maxTokens}
              onChange={handleChange}
              inputProps={{step: 1, min:1}}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Presence Penalty</InputLabel>
            <TextField
              type="number" 
              name="presencePenalty" 
              value={settings.presencePenalty}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:2}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency Penalty</InputLabel>
            <TextField
              type="number" 
              name="frequencyPenalty" 
              value={settings.frequencyPenalty}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:2}}
              />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
              checked={settings.injectSystemPrompts}
              onChange={handleChange}
                name="injectSystemPrompts"
              />
            }
            label="Inject System Prompts"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Input Template</InputLabel>
            <TextField
              name="inputTemplate" 
              value={settings.inputTemplate}
              onChange={handleChange}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Attached Messages Count</InputLabel>
            <TextField
              type="number" 
              name="attachedMessagesCount" 
              value={settings.attachedMessagesCount}
              onChange={handleChange}
              inputProps={{step:1,min:1,max:64}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>History Compression Threshold</InputLabel>
            <TextField
              type="number" 
              name="historyCompressionThreshold" 
              value={settings.historyCompressionThreshold}
              onChange={handleChange}
              inputProps={{step:1,min:1}}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Memory Prompt</InputLabel>
            <TextField
              name="memoryPrompt" 
              value={settings.memoryPrompt}
              onChange={handleChange}
              />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
              checked={settings.sendMemory}
              onChange={handleChange}
              name="sendMemory"
              />
              }
              label="Send Memory"
              />
          <FormControl fullWidth margin="normal">
            <InputLabel>Send Key</InputLabel>
            <Select
              name="sendKey" 
              value={settings.sendKey}
              onChange={handleChange}
              >
              {/* Enter, Ctrl + Enter, Shift + Enter, Alt + Enter, Meta + Enter */}
              <MenuItem value="enter">Enter</MenuItem>
              <MenuItem value="controlEnter">Ctrl + Enter</MenuItem>
              <MenuItem value="shiftEnter">Shift + Enter</MenuItem>
              <MenuItem value="altEnter">Alt + Enter</MenuItem>
              <MenuItem value="metaEnter">Meta + Enter</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select
              name="theme" 
              value={settings.theme}
              onChange={handleChange}
              >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Font Size</InputLabel>
            <TextField
              type="number"
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
              inputProps={{ step: 1, min: 1 }}
              />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
              checked={settings.autoGenerateTitle}
              onChange={handleChange}
              name="autoGenerateTitle"
              />
              }
              label="Auto Generate Title"
              />
          <FormControlLabel
            control={
              <Switch
              checked={settings.sendPreviewBubble}
              onChange={handleChange}
              name="sendPreviewBubble"
              />
              }
              label="Send Preview Bubble"
              />
          <FormControlLabel
            control={
              <Switch
              checked={settings.hideBuiltinTemplates}
              onChange={handleChange}
              name="hideBuiltinTemplates"
              />
              }
              label="Hide Builtin Templates"
              />
          <FormControlLabel
            control={
              <Switch
                checked={settings.disableAutoCompletion}
                onChange={handleChange}
                name="disableAutoCompletion"
                />
                }
                label="Disable Auto-Completion"
                />
          <FormControl fullWidth margin="normal">
            <InputLabel>Cache Type</InputLabel>
            <Select
              name="cacheType"
              value={settings.cacheType}
              onChange={handleChange}
            >
              <MenuItem value="IndexDB">IndexDB</MenuItem>
              <MenuItem value="CacheAPI">Cache API</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Logging Level</InputLabel>
            <Select
              name="loggingLevel"
              value={settings.loggingLevel}
              onChange={handleChange}
            >
              <MenuItem value="debug">Debug</MenuItem>
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="warn">Warn</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <div className="mt-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            className="mb-2"
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