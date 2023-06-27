//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by tester on 5/31/23.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Override point for customization after application launch.
        NSApplication.shared.helpMenu?.items.first?.action = #selector(openHelpPage)
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
