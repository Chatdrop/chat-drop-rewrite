import Foundation
import AVFoundation
import React

@objc(TorchModule)
class TorchModule: NSObject {
  
  @objc
  func switchState(_ state: Bool) -> Void {
    DispatchQueue.main.async {
      guard let device = AVCaptureDevice.default(for: .video) else {
        print("❌ No video device available")
        return
      }
      
      guard device.hasTorch else {
        print("❌ Device has no torch")
        return
      }
      
      do {
        try device.lockForConfiguration()
        
        if state {
          try device.setTorchModeOn(level: 1.0)
          print("🔦 Torch turned ON")
        } else {
          device.torchMode = .off
          print("🔦 Torch turned OFF")
        }
        
        device.unlockForConfiguration()
      } catch {
        print("❌ Torch error: \(error.localizedDescription)")
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

