//
//  Views.swift
//  Beet Engine
//
//  Created by tester on 7/5/23.
//

import Foundation
import SwiftUI
#if os(iOS)
import UIKit
typealias PlatformImage = UIImage
#endif
#if os(macOS)
import AppKit
typealias PlatformImage = NSImage
#endif

struct AppIconView: View {
    private let size: CGFloat = 100
    let appIcon = PlatformImage(named: "AppIcon")!
    
    var body: some View {
        image
            .resizable()
            .frame(width: size, height: size)
    }
    
    private var image: Image {
        #if os(iOS)
        return Image(uiImage: appIcon)
        #else
        return Image(nsImage: appIcon)
        #endif
    }
}
