#!/usr/bin/env node

/**
 * Vercel Project Setup Script
 * 
 * This script helps to automate the creation and configuration of Vercel projects
 * for the Wilma Ecosystem. It uses the Vercel CLI to create projects, set environment
 * variables, and configure domains.
 * 
 * Prerequisites:
 * 1. Vercel CLI installed (npm i -g vercel)
 * 2. Logged in to Vercel CLI (vercel login)
 * 3. Node.js 14+ installed
 * 
 * Usage:
 * node setup-vercel-projects.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration
const PROJECTS = [
  {
    name: 'wilma-landing',
    directory: 'wilma-ecosystem/apps/landing',
    framework: 'nextjs',
    domain: 'wilma-wedding.com',
    buildCommand: 'cd ../.. && pnpm build --filter @wilma/landing',
    installCommand: 'cd ../.. && pnpm install',
    devCommand: 'pnpm dev',
    envVars: [
      'NEXT_PUBLIC_ANALYTICS_ID',
      'NEXT_PUBLIC_APP_ENV',
      'NEXT_PUBLIC_BUDGET_APP_URL'
    ]
  },
  {
    name: 'wilma-budget-calculator',
    directory: 'wilma-budget-calculator',
    framework: 'vite',
    domain: 'budget.wilma-wedding.com',
    buildCommand: 'pnpm build',
    installCommand: 'pnpm install',
    devCommand: 'pnpm dev',
    envVars: [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY',
      'VITE_ANALYTICS_ID',
      'VITE_APP_ENV',
      'VITE_MAIN_SITE_URL'
    ]
  }
];

// Helper functions
function executeCommand(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main setup function
async function setupVercelProjects() {
  console.log('🚀 Starting Wilma Ecosystem Vercel Project Setup');
  
  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ Vercel CLI is not installed. Please install it with: npm i -g vercel');
    process.exit(1);
  }
  
  // Check if user is logged in to Vercel
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ You are not logged in to Vercel. Please login with: vercel login');
    process.exit(1);
  }
  
  const teamName = await prompt('Enter your Vercel team name (leave empty for personal account): ');
  const teamFlag = teamName ? `--scope ${teamName}` : '';
  
  for (const project of PROJECTS) {
    console.log(`\n📦 Setting up project: ${project.name}`);
    
    // Check if project exists
    try {
      execSync(`vercel project ls ${teamFlag} | grep ${project.name}`, { stdio: 'ignore' });
      console.log(`Project ${project.name} already exists.`);
      
      const shouldContinue = await prompt('Continue with configuration? (y/n): ');
      if (shouldContinue.toLowerCase() !== 'y') {
        console.log(`Skipping ${project.name} configuration.`);
        continue;
      }
    } catch (error) {
      // Project doesn't exist, create it
      console.log(`Creating new project: ${project.name}`);
      executeCommand(`vercel projects add ${project.name} ${teamFlag}`);
    }
    
    // Link project to directory
    console.log(`Linking project to directory: ${project.directory}`);
    executeCommand(`cd ${project.directory} && vercel link --project ${project.name} ${teamFlag}`);
    
    // Set project settings
    console.log('Setting project configuration...');
    executeCommand(`vercel project update ${project.name} --framework ${project.framework} ${teamFlag}`);
    
    // Set build commands if not using vercel.json
    console.log('Setting build commands...');
    executeCommand(`vercel project update ${project.name} --build-command "${project.buildCommand}" ${teamFlag}`);
    executeCommand(`vercel project update ${project.name} --install-command "${project.installCommand}" ${teamFlag}`);
    executeCommand(`vercel project update ${project.name} --dev-command "${project.devCommand}" ${teamFlag}`);
    
    // Set environment variables
    console.log('Setting up environment variables...');
    for (const envVar of project.envVars) {
      const value = await prompt(`Enter value for ${envVar}: `);
      if (value) {
        executeCommand(`vercel env add ${envVar} production ${teamFlag} --project ${project.name}`);
        // The command above will prompt for the value interactively
      }
    }
    
    // Add domain
    console.log(`Setting up domain: ${project.domain}`);
    executeCommand(`vercel domains add ${project.domain} ${project.name} ${teamFlag}`);
    
    console.log(`✅ Project ${project.name} setup complete!`);
  }
  
  console.log('\n🎉 All projects have been set up successfully!');
  console.log('\nNext steps:');
  console.log('1. Verify your domains in the Vercel dashboard');
  console.log('2. Configure your DNS settings as specified in the DEPLOYMENT.md guide');
  console.log('3. Deploy your projects with: vercel --prod');
  
  rl.close();
}

// Run the setup
setupVercelProjects().catch(error => {
  console.error('Error setting up Vercel projects:', error);
  process.exit(1);
});
