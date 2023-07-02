//
//  main.swift
//  REPLACEME (macOS)
//
//  Created by Kyle Nazario on 6/28/23.
//

import Foundation
import AppKit

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate

_ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
