package com.pathway

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LocalLLMBridgeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "LocalLLMBridge"
    }

    @ReactMethod
    fun generateResponse(prompt: String, promise: Promise) {
        try {
            // NOTE: Google's AI Edge (Gemini Nano) requires API 34+ and may not be widely available
            // For now, we return an error to match iOS behavior when Apple Intelligence is unavailable
            // This can be updated when on-device AI becomes more widely available on Android
            
            promise.reject(
                "no_model",
                "On-device AI is not available on this device. Google's AI Edge requires API 34+ and may not be enabled.",
                null
            )
            
            // Future implementation with AI Edge would look like:
            // val aiClient = AIEdgeClient.create(reactApplicationContext)
            // if (aiClient.isAvailable()) {
            //     val response = aiClient.generateText(prompt)
            //     promise.resolve(response)
            // } else {
            //     promise.reject("no_model", "On-device AI not available", null)
            // }
            
        } catch (e: Exception) {
            promise.reject("model_error", e.localizedMessage, e)
        }
    }
}
