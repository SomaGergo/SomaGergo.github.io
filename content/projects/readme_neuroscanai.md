# NeuroScan AI

NeuroScan AI is a research-focused 3D brain tumor segmentation system developed as a BSc graduation project in Data Science and AI. It uses multi-modal MRI scans and a custom 3D U-Net pipeline to segment clinically relevant tumor regions and present the results through an interactive web interface.

> Research prototype only. Not intended for clinical use.

## Overview

The project was built around the BraTS Task01 brain tumor dataset and designed to solve an end-to-end problem: from volumetric medical imaging input to model inference, evaluation, and a browser-based visualization experience.

The goal was not only to train an accurate segmentation model, but also to package the system in a form that makes the output easier to inspect and understand.

## What It Does

- processes four MRI modalities: T1, T1ce, T2, and FLAIR
- segments three tumor sub-regions:
  - whole tumor
  - tumor core
  - enhancing tumor
- serves predictions through a FastAPI application
- provides interactive 2D slice previews and 3D mesh visualization in the browser

## Model and Pipeline

At the core of the system is a custom Residual Squeeze-and-Excitation 3D U-Net with deep supervision during training. The inference pipeline includes:

- sliding-window inference for large 3D volumes
- three-fold ensemble prediction
- test-time augmentation using flip combinations
- post-processing to clean small artifacts and enforce anatomical consistency

This design was chosen to balance segmentation quality, robustness, and deployability on real hardware.

## Results

### Held-Out Test Set

The strongest reported result came from a fully held-out test set of 72 unseen cases.

| Region | Mean Dice | +/- Std |
|---|---|---|
| Whole Tumor | 0.906 | 0.062 |
| Tumor Core | 0.847 | 0.107 |
| Enhancing Tumor | 0.799 | 0.216 |
| Mean | 0.851 | 0.099 |

### Cross-Validation

Across the broader train/validation set, the final ensemble achieved a mean Dice score of 0.853, performing competitively with strong reference baselines for this task.

## Engineering Scope

The project included more than model training alone. It also covered:

- dataset preparation and analysis
- model experimentation and evaluation
- error analysis on unseen cases
- API development with FastAPI
- browser-based visualization for slices and 3D meshes
- Docker-based deployment workflow

## Why It Matters

Medical imaging projects are often judged only by model metrics, but this work also emphasized usability and communication. By combining segmentation performance with an interactive interface, NeuroScan AI became a more complete demonstration of applied AI engineering: not just training a model, but delivering a system people can actually explore.

## Tech Stack

- Python
- PyTorch
- MONAI-inspired medical imaging workflow
- FastAPI
- Docker
- Plotly

## What This Project Shows

This project demonstrates the ability to:

- build and evaluate advanced deep learning systems for 3D medical imaging
- design reliable inference pipelines for large volumetric data
- translate research code into a deployable product-style prototype
- communicate technical results through visual and interactive tooling
