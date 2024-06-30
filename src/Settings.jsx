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
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.Temperature.Title}</InputLabel>
            <InputLabel>{en.Settings.Temperature.SubTitle}</InputLabel>
            <TextField 
              type="number" 
              name="temperature" 
              value={settings.Temperature}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0,max:1}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.TopP.Title}</InputLabel>
            <InputLabel>{en.Settings.TopP.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="maxTokens" 
              value={settings.topP}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:1}}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.MaxTokens.Title}</InputLabel>
            <InputLabel>{en.Settings.MaxTokens.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="maxTokens" 
              value={settings.maxTokens}
              onChange={handleChange}
              inputProps={{step: 1, min:1}}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.PresencePenalty.Title}</InputLabel>
            <InputLabel>{en.Settings.PresencePenalty.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="presencePenalty" 
              value={settings.presencePenalty}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:2}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.FrequencyPenalty.Title}</InputLabel>
            <InputLabel>{en.Settings.FrequencyPenalty.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="frequencyPenalty" 
              value={settings.frequencyPenalty}
              onChange={handleChange}
              inputProps={{step: 0.1, min:0, max:2}}
              />
          </FormControl>
          <FormControl component='fieldset' fullWidth margin="normal">
            <Typography >
              <InputLabel>{en.Settings.InjectSystemPrompts.Title}</InputLabel>
              <InputLabel>{en.Settings.InjectSystemPrompts.SubTitle}</InputLabel>
            </Typography>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                checked={settings.injectSystemPrompts}
                onChange={handleChange}
                name="injectSystemPrompts"
                />
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.InputTemplate.Title}</InputLabel>
            <InputLabel>{en.Settings.InputTemplate.SubTitle}</InputLabel>
            <TextField
              name="inputTemplate" 
              value={settings.inputTemplate}
              onChange={handleChange}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.HistoryCount.Title}</InputLabel>
            <InputLabel>{en.Settings.HistoryCount.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="attachedMessagesCount" 
              value={settings.attachedMessagesCount}
              onChange={handleChange}
              inputProps={{step:1,min:1,max:64}}
              />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{en.Settings.CompressThreshold.Title}</InputLabel>
            <InputLabel>{en.Settings.CompressThreshold.SubTitle}</InputLabel>
            <TextField
              type="number" 
              name="historyCompressionThreshold" 
              value={settings.historyCompressionThreshold}
              onChange={handleChange}
              inputProps={{step:1,min:1}}
            />
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