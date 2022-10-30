//
//  ContentView.swift
//  TicTacGo
//
//  Created by Haneen Mahdin on 30/10/22.
//

import SwiftUI

enum GradientState {
    case start, middle, finish
}

struct ContentView: View {
    @State private var animationState = GradientState.start
    @State private var hueRotation = 0.0
    
    var body: some View {
        TabView {
            ZStack {
                LinearGradient(
                    colors: [
                        .green,
                        .blue.opacity(0.6),
                        .orange.opacity(0.1)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing)
                .hueRotation(.degrees(hueRotation))
                
                VStack(alignment: .leading) {
                    HStack {
                        Text("TicTacGo")
                            .font(.title2.weight(.medium))
                        
                        Spacer()
                        
                        Image("avatar")
                            .resizable()
                            .frame(width: 50, height: 50)
                            .clipShape(Circle())
                            .overlay {
                                Circle().stroke(.white, lineWidth: 4)
                            }
                            .shadow(radius: 7)
                    }
                    .padding(.horizontal, 30)
                    .padding(.vertical)
                    
                    
                    VStack(alignment: .leading) {
                        Text("Haneen's Dashboard")
                            .font(.largeTitle.weight(.semibold))
                        
                        VStack {
                            HStack {
                                HStack {
                                    Image("avatar2")
                                        .resizable()
                                        .frame(width: 30, height: 30)
                                        .clipShape(Circle())
                                    
                                    Text("Travis")
                                }
                                
                                Spacer()
                                
                                Text("Won")
                                    .foregroundColor(.secondary)
                            }
                            
                            Divider()
                            
                            HStack {
                                HStack {
                                    Image("avatar3")
                                        .resizable()
                                        .frame(width: 30, height: 30)
                                        .clipShape(Circle())
                                    
                                    Text("Lily")
                                }
                                
                                Spacer()
                                
                                Text("Lost")
                                    .foregroundColor(.secondary)
                            }
                            
                            Divider()
                            
                            Text("You've won over 25 games in the past 30 days. That's a 38% increase.")
                                .padding(.vertical)
                                .multilineTextAlignment(.center)
                                .foregroundColor(.secondary)
                        }
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(.thickMaterial)
                        .cornerRadius(15)
                    }
                    .padding(.horizontal, 30)
                    
                    Spacer()
                }
                .padding(.top, 50)
            }
            .ignoresSafeArea()
            .onAppear {
                withAnimation(.easeIn(duration: 3).repeatForever(autoreverses: true)) {
                    switch animationState {
                    case .start:
                        hueRotation = 60
                        animationState = .middle
                    case .middle:
                        hueRotation = 180
                        animationState = .finish
                    case .finish:
                        hueRotation = 360
                    }
                }
            }
            .tabItem {
                Label("Dashboard", systemImage: "gamecontroller.fill")
            }
            
            VStack {
                Text("New Tab")
            }
            .tabItem {
                Label("Friends", systemImage: "person.3.sequence.fill")
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .preferredColorScheme(.dark)
    }
}
