import { useCallback, useEffect, useRef, useState } from "react"
import * as webllm from '@mlc-ai/web-llm';
import { Button, CircularProgress, FormControl, InputLabel,MenuItem,Select, TextField } from "@mui/material";

const Chat = () => {
    const [messages,setMessages] = useState([
      { content: "You are a very helpful AI agent helping for users.", role: "system" }
    ]);
    const [input,setInput] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [stats,setStats] = useState("");
    const [availableModels,setAvailableModels] = useState([]);
    const [selectedModel,setSelectedModel] = useState("TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC-1k");
    const [initProgress,setInitProgress] = useState('')

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

      const config = {temperature: 1.0, top_p: 1};
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
        setInitProgress('Failed to load the model')
      }
      setIsLoading(false)
    },[selectedModel])
    //[selectedModel,engine]
    // console.log(initializeEngine());

    useEffect(()=>{
      initializeEngine();
    },[initializeEngine]);

    const onMessageSend = async ()=>{
      if(input.trim().length === 0 || !isModelLoaded) return;

      const userMessage = {content: input, role:"user"};
      setMessages((prevMessages)=>[...prevMessages,userMessage]);
      setInput("");
      setIsLoading(true);

      const aiMessage = {content:"typing...",role:"assistant"};
      setMessages((prevMessages) => [...prevMessages,aiMessage]);

      const updatedMessages = [...messages,userMessage]

      const onFinishGenerating = async (finalMessage,usage) => {
        setMessages((prevMessages)=>{
          const newMessages = [...prevMessages]
          newMessages[newMessages.length-1] = {content: finalMessage,role:"assistant"};
          return newMessages;
        });
        setIsLoading(false);
        setStats(JSON.stringify(usage))

        // if(engine.current.runtimeStatsText){
        //   const statsText = await engine.current.runtimeStatsText();
        //   console.log(statsText);
        //   setStats(statsText);
        // }else{
        //   console.error('runtimestats method is not available on the engine');
        // } // remove usage and stream option and use this runtimestats method snippet
      };

      try {
        const completion = await engine.current.chat.completions.create({
          stream:true,
          messages:updatedMessages,
          stream_options: {include_usage:true}
        })
        console.log(completion);

        let currMessage = "";
        let usage = null;
        for await(const chunk of completion){
          console.log(chunk);
          const currDelta = chunk.choices[0].delta.content;
          usage = chunk.usage;
          console.log(currDelta);
          if(currDelta){
            currMessage += currDelta;
            console.log(currMessage);
            setMessages((prevMessages)=>{
              const newMessages = [...prevMessages];
              newMessages[newMessages.length-1] = {content:currMessage, role:"assistant"};
              return newMessages;
            });
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

  return (
    <div className="flex flex-col items-center p-4">
        <div className={`mb-4 ${isLoading ? "":"hidden"}`}>
          {initProgress}
        </div>
        <FormControl className="w-full mb-4">
          <InputLabel id="model-selection-label" >Select a model</InputLabel>
          <Select 
            labelId="model-selection-label"
            id="model-selection"
            value={selectedModel}
            onChange={(e)=> setSelectedModel(e.target.value)}
            disabled={isLoading || isModelLoaded}
          >
            {availableModels.map((modelId)=>(
              <MenuItem key={modelId} value={modelId}>
                {modelId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="contained"
          color="primary"
          onClick={initializeEngine}
          disabled={isLoading || isModelLoaded}
          className="mb-4"
        >
          { isLoading ? <CircularProgress size={24} /> : "Load the model"}
        </Button>

        <div 
          id="chat-box"
          className="w-full max-h-96 overflow-y-scroll border border-gray-300 p-4 mb-4"
        >{messages.map((message,index)=>(
          <div key={index} className={`message-container ${message.role === "user" ? "text-right" : "text-left"} mb-2`}>
            <div className={`inline-block p-2 rounded ${message.role === "user" ? "bg-blue-200":" bg-gray-200"}`}>
              {message.content}
            </div>
          </div>
        ))}
        </div>
        <TextField 
          id="user-input" 
          variant="outlined" 
          fullWidth 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "Generating the content..." : "Type your message"}
          disabled={isLoading || !isModelLoaded}
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onMessageSend}
          disabled={isLoading || !isModelLoaded}
        >
          {isLoading ? <CircularProgress size={24} /> : "Send"}
        </Button>

        <div id="chat-stats" className={`mt-4 text-sm text-gray-500 ${stats ? "" : "hidden"}`}>
          {stats}
        </div>
    </div>
  )
}

export default Chat