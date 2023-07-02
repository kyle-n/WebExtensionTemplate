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
            
        }
    }
}

struct AppIconView: View {
    private let size: CGFloat = 50
    
    var body: some View {
        Rectangle()
            .foregroundColor(.blue)
            .frame(width: size, height: size)
    }
}

struct SafariPrefsButton: View {
    var body: some View {
        Button("Quit and open Safari Preferences", action: openPrefs)
    }
    
    private func openPrefs() {
        
    }
}

struct AppView_Previews: PreviewProvider {
    static var previews: some View {
        AppView()
            .frame(width: MAC_WINDOW_SIZE, height: MAC_WINDOW_SIZE)
    }
}
