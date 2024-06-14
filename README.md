<!-- const settingsReducer = (state,action) =>{
	switch(action.type){
		case 'UPDATE_SETTING':
			return {
				...state,
				[action.name]:action.value,
			};
		case 'SET_SETTINGS':
			return {
				...state,
				...action.payload,
			};
    case 'RESET_SETTINGS':
      return initialSettings;
    case 'CLEAR_DATA':
      return initialSettings;
		default:
			return state
	}
}

const initialSettings = {
  temperature: 1.0,
  topP: 1.0,
  maxTokens: 512,
  presencePenalty: 0.0,
  frequencyPenalty: 0.0,
  injectSystemPrompts: false,
  inputTemplate: '',
  attachedMessagesCount: 5,
  historyCompressionThreshold: 1000,
  memoryPrompt: '',
  sendMemory: false,
  sendKey: '',
  theme: 'light',
  language: 'en',
  fontSize: 14,
  autoGenerateTitle: false,
  sendPreviewBubble: false,
  hideBuiltinTemplates: false,
  disableAutoCompletion: false,
  loggingLevel: 'info',
  cacheType: 'IndexDB',
}; -->