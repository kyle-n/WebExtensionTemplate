//
//  AppView.swift
//  REPLACEME (macOS)
//
//  Created by Kyle Nazario on 7/2/23.
//

import SwiftUI
import SafariServices

struct AppView: View {
    
    private let appIcon = NSImage(named: "AppIcon")
    var body: some View {
        VStack {
            AppIconView()
            EnabledMessageView()
                .padding(.vertical)
            SafariPrefsButton()
        }
    }
}

struct EnabledMessageView: View {
    @State private var enabled = false
    
    var body: some View {
        Text(message)
            .onAppear(perform: loadEnabled)
    }
    
    private var message: String {
        enabled ? "\(APP_NAME) is enabled" : "\(APP_NAME) is disabled. Enable it in Safari Preferences."
    }
    
    private func loadEnabled() {
        Task {
            self.enabled = await SafariConnector.extensionIsEnabled()
        }
    }
}

struct SafariPrefsButton: View {
    var body: some View {
        Button("Quit and Open Safari Preferences", action: openPrefs)
    }
    
    private func openPrefs() {
        Task {
            await SafariConnector.openExtensionPrefs()
            await NSApplication.shared.terminate(nil)
        }
    }
}

struct AppView_Previews: PreviewProvider {
    static var previews: some View {
        AppView()
            .frame(width: MAC_WINDOW_SIZE, height: MAC_WINDOW_SIZE)
    }
}
