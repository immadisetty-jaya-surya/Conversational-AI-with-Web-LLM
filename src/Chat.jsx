import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import * as webllm from '@mlc-ai/web-llm';
import { Button, CircularProgress, FormControl,MenuItem,Select, TextField } from "@mui/material";
import Sidebar from "./Sidebar";

const settingsReducer = (state,action) =>{
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
  maxTokens: 4000,
  presencePenalty: 1.0,
  frequencyPenalty: 1.0,
  injectSystemPrompts: false,
  inputTemplate: '{{input}}',
  attachedMessagesCount: 5,
  historyCompressionThreshold: 1000,
  // memoryPrompt: '',
  // sendMemory: false,
  // sendKey: '',
  // theme: 'light',
  // language: 'en',
  // fontSize: 14,
  // autoGenerateTitle: false,
  // sendPreviewBubble: false,
  // hideBuiltinTemplates: false,
  // disableAutoCompletion: false,
  // loggingLevel: 'info',
  // cacheType: 'IndexDB',
};

const Chat = () => {
    // const [messages,setMessages] = useState([
    //   { content: "You are a very helpful AI agent helping for users.", role: "system" }
    // ]);
    const [messages,dispatchMessages] = useReducer((state,action)=>{
      switch (action.type){
        case 'ADD_MESSAGE':
          return [...state,action.message];
        case 'UPDATE_LAST_MESSAGE':
          // eslint-disable-next-line no-case-declarations
          const updatedMessages = [...state];
          updatedMessages[updatedMessages.length-1] = action.message;
          return updatedMessages;
        case 'CLEAR_MESSAGES':
          return [{ content: "You are a very helpful AI agent helping for users.", role: "system"}]
        default:
          return state;
      }
    },[
        { content: "You are a very helpful AI agent helping for users.", role: "system" }
      ]);
    const [input,setInput] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [stats,setStats] = useState("");
    const [availableModels,setAvailableModels] = useState([]);
    const [selectedModel,setSelectedModel] = useState("TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC-1k");
    const [initProgress,setInitProgress] = useState('')
    const [isSettingsOpen,setIsSettingsOpen] = useState(false);
    const [settings,dispatchSettings] = useReducer(settingsReducer,initialSettings)

    const engine = useRef(null);

    useEffect(()=>{
      const models = webllm.prebuiltAppConfig.model_list.map((m) => 
      m.model_id);
      // console.log(models);
      setAvailableModels(models)
    },[])

    const initializeEngine = useCallback(async ()=>{
      setIsLoading(true);
      setIsModelLoaded(false);
      setInitProgress('Initializing...');

      const config = {
        temperature: settings.temperature,
        top_p: settings.topP,
        maxTokens: settings.maxTokens,
        presencePenalty: settings.presencePenalty,
        frequencyPenalty: settings.frequencyPenalty,
        injectSystemPrompts: settings.injectSystemPrompts,
        inputTemplate: settings.inputTemplate,
        attachedMessagesCount: settings.attachedMessagesCount,
        historyCompressionThreshold: settings.historyCompressionThreshold,
      };

      try {
        if(!engine.current){
          engine.current = new webllm.MLCEngine();
          // console.log(engine.current);
          engine.current.setInitProgressCallback((report) => {
            console.log("Initialize",report.progress);
            setInitProgress(report.text);
          })
        }
        await engine.current.reload(selectedModel,config);
        setIsModelLoaded(true);
        setInitProgress('model loaded successfully')
      } catch (error) {
        console.error("Failed ot load the model",error);
        setInitProgress('Failedd to load the model')
      }
      setIsLoading(false)
    },[selectedModel,settings]);
    //[selectedModel,engine]

    useEffect(()=>{
      initializeEngine();
    },[initializeEngine]);

    const onMessageSend = async ()=>{
      if(input.trim().length === 0 || !isModelLoaded) return;

      const userMessage = {content: input, role:"user"};
      // setMessages((prevMessages)=>[...prevMessages,userMessage]);
      dispatchMessages({type: 'ADD_MESSAGE',message:userMessage})
      setInput("");
      setIsLoading(true);

      const aiMessage = {content:"typing...",role:"assistant"};
      // setMessages((prevMessages) => [...prevMessages,aiMessage]);
      dispatchMessages({type:'ADD_MESSAGE',message:aiMessage})

      const updatedMessages = [...messages, userMessage]

      const onFinishGenerating = async (finalMessage,usage) => {
        // setMessages((prevMessages)=>{
        //   const newMessages = [...prevMessages]
        //   newMessages[newMessages.length-1] = {content: finalMessage,role:"assistant"};
        //   return newMessages;
        // });
        dispatchMessages({type:'UPDATE_LAST_MESSAGE',message:{content: finalMessage,role:"assistant"} });
        setIsLoading(false);
        setStats(JSON.stringify(usage))

        if(engine.current.runtimeStatsText){
          const statsText = await engine.current.runtimeStatsText();
          console.log(statsText);
          setStats(statsText);
        }else{
          console.error('runtimestats method is not available on the engine');
        } // remove usage and stream option and use this runtimestats method snippet
      };

      try {
        const completion = await engine.current.chat.completions.create({
          stream:true,
          messages:updatedMessages,
          stream_options: {include_usage:true}
        })

        let currMessage = "";
        let usage = null;
        for await(const chunk of completion){
          if(chunk.choices && chunk.choices[0] && chunk.choices[0].delta){
            const currDelta = chunk.choices[0].delta.content;
            usage = chunk.usage;
            if(currDelta){
              currMessage += currDelta;
              // setMessages((prevMessages)=>{
              //   const newMessages = [...prevMessages];
              //   newMessages[newMessages.length-1] = {content:currMessage, role:"assistant"};
              //   return newMessages;
              // });
              dispatchMessages({type:'UPDATE_LAST_MESSAGE',message:{content:currMessage, role:"assistant"} })
          }
          }
        }

        // const finalMessage = await engine.getMessage();
        // onFinishGenerating(finalMessage);

        // onFinishGenerating(currMessage);

        onFinishGenerating(currMessage,usage);
        } catch (error) {
          console.log("Error during message generation",error);
          setIsLoading(false);
      }
    }

    const clearAllData = () => {
      dispatchMessages({type: 'CLEAR_MESSAGES'})
      dispatchMessages({type: 'CLEAR_DATA'})
    }

    const handleSaveSettings = (updatedSettings) => {
      dispatchSettings({ type: 'SET_SETTINGS', payload: updatedSettings });
      setIsSettingsOpen(false);
    };

    return (
      <div className="flex h-screen">
        <Sidebar 
          handleSaveSettings={handleSaveSettings}
          dispatchSettings={dispatchSettings}
          clearAllData={clearAllData}
          settings={settings}
        />
        <div className="flex flex-col items-center p-4 bg-white min-h-screen border w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full mb-1 " style={{top:'1rem'}}>
            <FormControl sx={{width:'fit-content',minWidth:'25%',borderRadius:'16px',margin:'0 1rem',minHeight:'25%'}}>
              {/* <InputLabel id="model-selection-label" >Select a model</InputLabel> */}
              <Select 
                labelId="model-selection-label"
                id="model-selection"
                value={selectedModel}
                onChange={(e)=> setSelectedModel(e.target.value)}
                disabled={isLoading || isModelLoaded}
                sx={{borderRadius:'16px'}}
                >
                {availableModels.map((modelId)=>(
                  <MenuItem key={modelId} value={modelId}>
                    {modelId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p className={`flex mb-[1px] mr-4 text-[10px] rounded-lg bg-white p-[1px] relative`}>
              {initProgress}
            </p>
          </div>
            {/* <Button 
              variant="contained"
              color="primary"
              onClick={initializeEngine}
              disabled={isLoading || isModelLoaded}
              className="mb-4"
              >
              { isLoading ? <CircularProgress size={24} /> : "Load the model"}
              </Button> */}

            <div className="flex flex-col justify-center items-center w-full mb-1 mt-1">
              <div 
                id="chat-box"
                className="w-[80%] flex flex-col h-[100vh] justify-center max-h-96 overflow-y-scroll border border-gray-300 p-4 bg-gray-50 rounded"
                style={{ borderRadius: '16px', borderColor: '#d1d5db', backgroundColor: '#f3f4f6' }}
              >
                <div className="flex-1 overflow-y-auto">
                  {messages.map((message,index)=>(
                    <div key={index} className={`message-container ${message.role === "user" ? "text-right" : "text-left"} mb-2`}>
                    <div className={`inline-block p-2 rounded ${message.role === "user" ? "bg-blue-200":" bg-gray-200"}`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
                </div>
                <div className="flex items-center mt-4 w-[80%]">
                  <TextField 
                    id="user-input" 
                    variant="outlined" 
                    fullWidth 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Generating the content..." : "Type your message"}
                    disabled={isLoading || !isModelLoaded}
                    className="mb-4"
                    sx={{borderRadius:'16px',marginRight:'1rem'}}
                    />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onMessageSend}
                    disabled={isLoading || !isModelLoaded}
                    sx={{borderRadius:'16px'}}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Send"}
                  </Button>
                </div>
            </div>

            <div id="chat-stats" className={`flex justify-center mt-4 text-sm text-gray-500 ${stats ? "" : "hidden"}`}>
              {stats}
            </div>
        </div>
      </div>
  )
}

export default Chat