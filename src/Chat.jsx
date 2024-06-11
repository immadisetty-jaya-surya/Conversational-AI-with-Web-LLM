import { useCallback, useEffect, useState } from "react"
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const engine = new webllm.MLCEngine();
    // console.log(engine);

    useEffect(()=>{
      const models = webllm.prebuiltAppConfig.model_list.map((m) => 
      m.model_id);
      // console.log(models);
      setAvailableModels(models)
    },[])

    const initializeEngine = useCallback(async ()=>{
      setIsLoading(true);
      setIsModelLoaded(false);
      const config = {
        temperature: 1.0,
        top_p: 1
      };
      try {
        await engine.reload(selectedModel,config);
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Failed ot load the model",error);
      }
      setIsLoading(false)
    },[selectedModel,engine])
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

      const onFinishGenerating = async (finalMessage) => {
        setMessages((prevMessages)=>{
          const newMessages = [...prevMessages]
          newMessages[newMessages.length-1] = {content: finalMessage,role:"assistant"};
          return newMessages;
        });
        setIsLoading(false);
        const statsText = await engine.runtimeStatsText();
        console.log(statsText);
        setStats(statsText);
      };
      try {
        const completion = await engine.chat.completions.create({
          stream:true,
          messages,
        })
        console.log(completion);

        let currMessage = "";
        for await(const chunk of completion){
          const currDelta = chunk.choices[0].delta.content;
          console.log(currDelta);
          if(currDelta){
            currMessage += currDelta;
            console.log(currMessage);
          }
          setMessages((prevMessages)=>{
            const newMessages = [...prevMessages];
            newMessages[newMessages.length-1] = {content:currMessage, role:"assistant"};
            return newMessages;
          });
        }
        const finalMessage = await engine.getMessage();
        onFinishGenerating(finalMessage);
      } catch (error) {
        console.log("Error during message generation",error);
        setIsLoading(false);
      }
    }

  return (
    <div className="flex flex-col items-center p-4">
        <div className={`mb-4 ${isLoading ? "":"hidden"}`}>
          { isModelLoaded ? "Model loaded" : "Initializing..."}
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