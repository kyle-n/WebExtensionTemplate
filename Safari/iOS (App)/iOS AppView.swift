//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by tester on 5/31/23.
//

import SwiftUI

@main
struct AppView: App {
    var body: some Scene {
        WindowGroup {
            InstructionsView()
        }
    }
}

struct InstructionsView: View {
    var body: some View {
        VStack {
            AppIconView()
                .cornerRadius(15)
                .padding(.bottom)
                .padding(.bottom)
            ForEach(steps, id: \.self) { step in
                Text(step)
                    .font(.system(size: 20))
                    .padding(.bottom)
            }
        }
    }
    
    private let steps = [
        "Open **Settings**",
        "Tap **Safari**",
        "Tap **Extensions**",
        "Tap **\(APP_NAME)**",
        "Enable **\(APP_NAME)**"
    ].map { try! AttributedString(markdown: $0) }
}
