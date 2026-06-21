import React, { useContext, useRef, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let [isListening, setIsListening] = useState(false)
  let openingSound = new Audio(open)
  const recognitionRef = useRef(null)
  const retryCountRef = useRef(0)
  const retryTimeoutRef = useRef(null)

  const handleTranscript = (transcript) => {
    const text = transcript.toLowerCase().trim()

    if (text.includes("search") && text.includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collection")
      return
    }

    if (text.includes("search") && text.includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)
      return
    }

    if (text.includes("collection") || text.includes("collections") || text.includes("product") || text.includes("products")) {
      speak("opening collection page")
      navigate("/collection")
      return
    }

    if (text.includes("about") || text.includes("aboutpage")) {
      speak("opening about page")
      navigate("/about")
      setShowSearch(false)
      return
    }

    if (text.includes("home") || text.includes("homepage")) {
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
      return
    }

    if (text.includes("cart") || text.includes("kaat") || text.includes("caat")) {
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false)
      return
    }

    if (text.includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
      return
    }

    if (text.includes("order") || text.includes("myorders") || text.includes("orders") || text.includes("my order")) {
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false)
      return
    }

    toast.error("Try Again")
  }

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error("Voice assistant is not supported in this browser")
      return
    }

    try {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }

      if (recognitionRef.current) {
        recognitionRef.current.abort()
        recognitionRef.current = null
      }

      retryCountRef.current = 0
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.continuous = false
      recognition.maxAlternatives = 1
      setIsListening(true)

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript
        handleTranscript(transcript)
      }

      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error)
        if (event.error === 'no-speech') {
          if (retryCountRef.current < 2) {
            retryCountRef.current += 1
            retryTimeoutRef.current = setTimeout(() => {
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.start()
                } catch (startError) {
                  console.log('Recognition retry failed:', startError)
                }
              }
            }, 400)
            return
          }

          toast.info('No speech detected. Try again and speak a command.')
          return
        }

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          toast.error('Microphone permission blocked. Allow mic access and try again.')
          return
        }

        toast.error('Voice assistant could not start')
      }

      recognition.onend = () => {
        setActiveAi(false)
        setIsListening(false)
        recognitionRef.current = null
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current)
          retryTimeoutRef.current = null
        }
      }

      recognition.start()
      openingSound.play().catch(() => { })
      setActiveAi(true)
    } catch (error) {
      console.log(error)
      toast.error('Voice assistant failed to start')
      setActiveAi(false)
      setIsListening(false)
      retryCountRef.current = 0
    }
  }
  return (
    <button type='button' className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] bg-transparent border-0 p-0 cursor-pointer' onClick={startListening} aria-label='Open voice assistant'>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
      }} />
      {isListening && <span className='sr-only'>Voice assistant listening</span>}
    </button>
  )
}

export default Ai
