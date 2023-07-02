//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by tester on 5/31/23.
//

import Cocoa
import SwiftUI

class AppDelegate: NSObject, NSApplicationDelegate {
    
    private var window: NSWindow!

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Override point for customization after application launch.
        NSApplication.shared.helpMenu?.items.first?.action = #selector(openHelpPage)
        
        let contentRect = NSRect(x: 0, y: 0, width: 400, height: 400)
        let styleMask: NSWindow.StyleMask = [.miniaturizable, .closable, .resizable, .titled]
        let backing = NSWindow.BackingStoreType.buffered
        let deferVal = false
        window = NSWindow(contentRect: contentRect, styleMask: styleMask, backing: backing, defer: deferVal)
        window.center()
        window.makeKeyAndOrderFront(nil)
        
        window.contentView = NSHostingView(rootView: AppView().frame(width: MAC_WINDOW_SIZE, height: MAC_WINDOW_SIZE))
        
    }
    
    @objc
    private func openHelpPage() {
        let helpLink = URL(string: "REPLACEME")!
        NSWorkspace.shared.open(helpLink)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
